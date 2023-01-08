import * as React from "react";
import {ReactNode, useCallback, useState} from "react";
import axios from "axios";
import {FileUploaderContext} from "./FileUploaderContext";
import {useDropzone} from "react-dropzone";

interface FileUploaderProviderProps {
    url: string;
    children: ReactNode;
}

export function FileUploaderProvider({children, url}: FileUploaderProviderProps) {

    /**
     * We declare states to track of:
     * - Which files must we upload (i.e. staged for upload)
     * - Which ones have completed upload (after the user presses submit, and we loop through each staged file)
     * - Which file is currently uploading
     * - What is the progress from [0..1] of the current uploading file
     */
    const [stagedFiles, setStagedFiles] = useState<File[]>([]);
    const [completedFiles, setCompletedFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [uploadingFile, setUploadingFile] = useState<File>();

    /**
     * useDropzone also returns props that Dropzone.tsx uses to bootstrap its HTML elements to detect drag and drop
     *
     * The react-dropzone library invokes the `onDropAccepted` callback when it detects the user adding new files - either through drag & drop or
     * by explicitly clicking on the dropzone and selecting a file. Regardless, we append the file that react-dropzone just
     * captured to our list of staged files for upload
     */
    const dropzoneState = useDropzone({
        onDropAccepted: (acceptedFiles: File[]) =>
            setStagedFiles(prevState => [...prevState, ...acceptedFiles]),
    });

    /**
     * Uploads a single file (passed in as parameter), by performing:
     * - Sets the uploadingFile to the passed in file (so components may know which file is currently uploading)
     * - Sets and monitors / updates progress
     * - Handles the actual communication with server
     */
    const uploadFile = useCallback(async (file: File) => {
        setProgress(0);
        const formData = new FormData();
        formData.append('file', file);
        setUploadingFile(file);
        await axios.post(
            url,
            formData,
            {
                onUploadProgress: ({loaded, total}) =>
                    total && setProgress(loaded / total),
            }
        );
        setUploadingFile(undefined);
        setProgress(0);
        setCompletedFiles(prevState => [...prevState, file]);
    }, [url]);

    /**
     * Essentially invokes uploadFile multiple times once per each staged file
     */
    const handleSubmit = useCallback(async () => {
        for (let i = 0; i < stagedFiles.length; i++) {
            let currFile = stagedFiles[i];
            await uploadFile(currFile);
        }
    }, [uploadFile, stagedFiles]);

    return (
        <FileUploaderContext.Provider
            value={{progress, uploadingFile, stagedFiles, completedFiles, dropzoneState, handleSubmit}}
        >
            {children}
        </FileUploaderContext.Provider>
    );
}