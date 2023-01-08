import * as React from "react";

type FileUploaderContextType = {
    progress: number;
    handleSubmit: () => Promise<void>;
    uploadingFile?: File,
    stagedFiles: File[],
    completedFiles: File[],
    handleDropAccepted: (files: File[]) => void,
};
// @ts-ignore
export const FileUploaderContext = React.createContext<FileUploaderContextType>({});