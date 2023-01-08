import * as React from "react";
import {useFileUploaderContext} from "./hooks/useFileUploaderContext";
import {ImUpload} from 'react-icons/im';

const size = 80;
const style = {height: size, width: size};

export function Dropzone() {
    const {dropzoneState: {getRootProps, getInputProps, isDragActive}} = useFileUploaderContext();
    return (
        <div
            {...getRootProps()}
            className={`rounded-lg duration-300 transition-colors w-96 h-64 border-2 border-dashed items-center justify-center flex p-4 ${isDragActive ? 'border-emerald-500 bg-emerald-200' : 'bg-gray-50 border-gray-300'}`}
        >
            <input {...getInputProps()}/>
            <div className="flex flex-col items-center">
                <ImUpload
                    style={style}
                    className={`transition-colors mb-4 ${isDragActive ? "text-emerald-700" : "text-gray-600"}`}
                />
                <p className={`transition-all ${isDragActive ? 'text-emerald-700' : 'text-gray-500'}`}>
                    {isDragActive
                        ? 'Release to Stage Files'
                        : 'Drop Files Here, or Click to Select Files'
                    }
                </p>
            </div>
        </div>
    );
}