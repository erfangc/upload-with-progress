import * as React from "react";

type FileUploaderContextType = {
    progress: number;
    handleSubmit: () => Promise<void>;
    uploadingFile: File,
    stagedFiles: File[],
    completedFiles: File[],
    handleDropAccepted: (files: File[]) => void,
};
export const FileUploaderContext = React.createContext<FileUploaderContextType>({
    progress: undefined,
    completedFiles: [],
    uploadingFile: undefined,
    stagedFiles: [],
    handleDropAccepted: () => null,
    handleSubmit: () => null,
});