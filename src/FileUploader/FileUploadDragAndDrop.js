import * as React from "react";
import {useDropzone} from "react-dropzone";
import {useFileUploaderContext} from "./hooks/useFileUploaderContext";
import {StagedFileList} from "./StagedFileList";

export function FileUploadDragAndDrop() {

    const {handleSubmit, handleDropAccepted} = useFileUploaderContext();
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDropAccepted: handleDropAccepted,
    });

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`rounded w-96 h-40 border-2 border-dashed items-center justify-center flex p-4 ${isDragActive ? 'border-green-500' : 'border-gray-400'}`}
            >
                <input {...getInputProps()}/>
                {
                    isDragActive
                        ? <p className="text-green-500">Let go to drop ...</p>
                        : <p className="text-gray-600">Drag & drop files here, or click to select files</p>
                }
            </div>
            <StagedFileList/>
            <button onClick={handleSubmit} className="px-2 py-1.5 bg-blue-500 rounded text-white">
                Submit
            </button>
        </div>
    );
}

