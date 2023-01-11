import * as React from "react";
import {DropzoneState} from "react-dropzone";

type FileUploaderContextType = {
    progress: number;
    handleSubmit: () => Promise<void>;
    uploadingFile?: File;
    busy: boolean;
    stagedFiles: File[];
    completedFiles: File[];
    dropzoneState: DropzoneState;
};
// @ts-ignore
export const FileUploaderContext = React.createContext<FileUploaderContextType>({});