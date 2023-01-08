import * as React from "react";
import {ReactNode, useCallback, useState} from "react";
import axios from "axios";
import {FileUploaderContext} from "./FileUploaderContext";

interface FileUploaderProviderProps {
    url: string;
    children: ReactNode;
}
export function FileUploaderProvider({children, url}: FileUploaderProviderProps) {

    const [stagedFiles, setStagedFiles] = useState<File[]>([]);
    const [completedFiles, setCompletedFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [uploadingFile, setUploadingFile] = useState<File>();

    const handleDropAccepted = useCallback(
        (acceptedFiles: File[]) => setStagedFiles(prevState => [...prevState, ...acceptedFiles]), []
    );

    const upload = useCallback(async (file: File) => {
        setProgress(0);
        const formData = new FormData();
        formData.append('file', file);
        setUploadingFile(file);
        await axios.post(
            url,
            formData,
            {
                onUploadProgress: progressEvent => setProgress(progressEvent.loaded / progressEvent.total!!),
            }
        );
        setUploadingFile(undefined);
        setProgress(0);
        setCompletedFiles(prevState => [...prevState, file]);
    }, [url]);

    const handleSubmit = useCallback(async () => {
        for (let i = 0; i < stagedFiles.length; i++) {
            let currFile = stagedFiles[i];
            await upload(currFile);
        }
    }, [upload, stagedFiles]);

    return (
        <FileUploaderContext.Provider
            value={{progress, uploadingFile, stagedFiles, completedFiles, handleDropAccepted, handleSubmit}}
        >
            {children}
        </FileUploaderContext.Provider>
    );
}