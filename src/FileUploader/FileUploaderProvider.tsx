import * as React from "react";
import {ReactNode, useCallback, useState} from "react";
import axios from "axios";
import {FileUploaderContext, StagedFile} from "./FileUploaderContext";
import {useDropzone} from "react-dropzone";

interface FileUploaderProviderProps {
    uploadUrl: string;
    children: ReactNode;
}

export function FileUploaderProvider({children, uploadUrl}: FileUploaderProviderProps) {

    /**
     * We declare states to track:
     * - Which files must we upload (i.e. staged for upload)
     * - Which ones have completed upload (after the user presses submit, and we loop through each staged file)
     * - Which file is currently uploading
     * - What is the progress from [0..1] of the current uploading file
     */
    const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
    const [busy, setBusy] = useState(false);

    /**
     * useDropzone returns props that `Dropzone.tsx` uses to bootstrap its HTML elements to detect drag and drop events and capture
     * dropped files
     *
     * The react-dropzone library invokes the `onDropAccepted` callback when it detects the user adding new files - either through drag & drop or
     * by explicitly clicking on the dropzone and selecting files. Regardless, we append the file that react-dropzone just
     * captured to our list of staged files for upload
     */
    const dropzoneState = useDropzone({
        onDropAccepted: (acceptedFiles: File[]) =>
            setStagedFiles(prevState => [
                    ...prevState,
                    ...acceptedFiles.map(file => ({file, progress: 0, completed: false}))
                ]
            ),
    });

    /**
     * Uploads a single file (passed in as parameter), by performing:
     * - Sets the uploadingFile to the passed in file (so components may know which file is currently uploading)
     * - Sets and monitors / updates progress
     * - Handles the actual communication with server
     */
    const uploadFile = useCallback(async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        await axios.post(
            uploadUrl,
            formData,
            {
                onUploadProgress: ({loaded, total}) => {
                    if (total) {
                        setStagedFiles(prevState =>
                            prevState.map(stagedFile => {
                                if (stagedFile.file === file) {
                                    return {...stagedFile, progress: loaded / total};
                                } else {
                                    return stagedFile;
                                }
                            })
                        );
                    }
                },
            }
        );
        setStagedFiles(prevState =>
            prevState.map(stagedFile => {
                if (stagedFile.file === file) {
                    return {...stagedFile, completed: true};
                } else {
                    return stagedFile;
                }
            })
        );
    }, [uploadUrl]);

    /**
     * Essentially invokes uploadFile multiple times once per each staged file
     */
    const handleSubmit = useCallback(async () => {
        setBusy(true);
        let i = 0;
        const next = () => {
            if (i < stagedFiles.length - 1) {
                uploadFile(stagedFiles[i].file).then(() => next());
            } else {
                uploadFile(stagedFiles[i].file).then(() => setBusy(false));
            }
            i++;
        }

        const max = 3;
        for (let x = 1; x <= max; x++) {
            next();
        }
    }, [stagedFiles, uploadFile]);

    const value = {
        busy,
        stagedFiles,
        dropzoneState,
        handleSubmit,
    };
    return (
        <FileUploaderContext.Provider value={value}>
            {children}
        </FileUploaderContext.Provider>
    );
}