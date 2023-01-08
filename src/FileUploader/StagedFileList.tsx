import {useFileUploaderContext} from "./hooks/useFileUploaderContext";
import {StagedFileForUpload} from "./StagedFileForUpload";
import * as React from "react";

export function StagedFileList() {
    const {stagedFiles} = useFileUploaderContext();
    return (
        <ul className="space-y-1">
            {stagedFiles.map(file => <StagedFileForUpload key={file.name} file={file}/>)}
        </ul>
    );
}