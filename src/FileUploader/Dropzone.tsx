import * as React from "react";
import {useFileUploaderContext} from "./hooks/useFileUploaderContext";
import {AiOutlineCloudUpload} from 'react-icons/ai';

export function Dropzone() {
    const {dropzoneState: {getRootProps, getInputProps, isDragActive}} = useFileUploaderContext();
    return (
        <div
            {...getRootProps()}
            className={`rounded duration-300 transition-all w-96 h-64 border-2 border-dashed items-center justify-center flex p-4 ${isDragActive ? 'border-emerald-500 bg-emerald-200' : 'bg-gray-100 border-gray-400'}`}
        >
            <input {...getInputProps()}/>
            <div className="flex flex-col items-center">
                <AiOutlineCloudUpload style={{height: 96, width: 96}} className="text-gray-500"/>
                <p className={`transition-all ${isDragActive ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {isDragActive
                        ? 'Drop to Add'
                        : 'Drop Files Here, or Click to Select Files'
                    }
                </p>
            </div>
        </div>
    );
}