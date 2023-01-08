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
                className={`rounded duration-300 transition-all w-96 h-40 border-2 border-dashed items-center justify-center flex p-4 ${isDragActive ? 'border-emerald-500' : 'border-gray-400'}`}
            >
                <input {...getInputProps()}/>
                <p className={`transition-all ${isDragActive ? 'text-emerald-500' : 'text-gray-500'}`}>
                    {isDragActive
                        ? 'Let go to drop ...'
                        : 'Drag & drop files here, or click to select files'
                    }
                </p>
            </div>
            <StagedFileList/>
            <button onClick={handleSubmit} className="px-2 py-1.5 bg-blue-500 rounded text-white">
                Submit
            </button>
        </div>
    );
}

