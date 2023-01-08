import * as React from "react";
import {ReactNode, useCallback, useState} from "react";
import axios from "axios";
import {FileUploaderContext} from "./FileUploaderContext";

interface FileUploaderProviderProps {
    url: string;
    children: ReactNode;
}
export function FileUploaderProvider({children, url}: FileUploaderProviderProps) {

    const [stagedFiles, setStagedFiles] = useState([]);
    const [completedFiles, setCompletedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [uploadingFile, setUploadingFile] = useState(undefined);

    const handleDropAccepted = useCallback(
        acceptedFiles => setStagedFiles(prevState => [...prevState, ...acceptedFiles]), []
    );

    const upload = useCallback(async (file) => {
        setProgress(0);
        const formData = new FormData();
        formData.append('file', file);
        setUploadingFile(file);
        await axios.post(
            url,
            formData,
            {
                onUploadProgress: progressEvent => setProgress(progressEvent.loaded / progressEvent.total),
            }
        );
        setUploadingFile(undefined);
        setProgress(undefined);
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