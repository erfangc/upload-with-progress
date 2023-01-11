import * as React from "react";
import {DropzoneState} from "react-dropzone";

type FileUploaderContextType = {
    handleSubmit: () => Promise<void>;
    busy: boolean;
    stagedFiles: StagedFile[];
    dropzoneState: DropzoneState;
};
// @ts-ignore
export const FileUploaderContext = React.createContext<FileUploaderContextType>({});

export interface StagedFile {
    file: File;
    progress: number;
    completed: boolean;
}