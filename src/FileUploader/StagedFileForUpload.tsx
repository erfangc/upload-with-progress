import {bytesToSize} from "./bytesToSize";
import * as React from "react";
import {useFileUploaderContext} from "./hooks/useFileUploaderContext";
interface StagedFileForUploadProps {
    file: File
}
export function StagedFileForUpload({file}: StagedFileForUploadProps) {
    const {uploadingFile, completedFiles, progress} = useFileUploaderContext();
    const uploadCompleted = completedFiles.includes(file);
    return (
        <li className="w-full text-gray-500 text-sm">
            <div
                className="justify-between items-center flex flex-row">
                <span className={`transition-all duration-300 ${uploadCompleted ? "font-bold text-emerald-700" : ""}`}>
                    {file.name}
                </span>
                <span className="text-xs">{bytesToSize(file.size)}</span>
            </div>
            <div className="w-full h-4">
                {uploadingFile === file && progress
                    ?
                    <div
                        style={{width: `${progress * 100}%`}}
                        className="bg-blue-500 transition-all h-4"
                    />
                    : null
                }
            </div>
        </li>
    );
}