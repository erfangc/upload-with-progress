import * as React from "react";
import {StagedFileList} from "./StagedFileList";
import {Dropzone} from "./Dropzone";
import {SubmitButton} from "./SubmitButton";

export function FileUploadDragAndDrop() {
    return (
        <div className="space-y-4">
            <Dropzone/>
            <StagedFileList/>
            <SubmitButton/>
        </div>
    );
}

