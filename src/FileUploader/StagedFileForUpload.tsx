import {bytesToSize} from "./bytesToSize";
import * as React from "react";
import {useFileUploaderContext} from "./hooks/useFileUploaderContext";
import {FileIcon} from "./FileIcon";

interface StagedFileForUploadProps {
    file: File
}

export function StagedFileForUpload({file}: StagedFileForUploadProps) {

    const {uploadingFile, progress} = useFileUploaderContext();

    return (
        <li className="w-full">
            <div className="items-center flex flex-row justify-between space-x-2">
                <span className="flex flex-row items-center space-x-1">
                    <FileIcon file={file}/>
                    <span className={`text-sm transition-all duration-300`}>
                        {file.name}
                    </span>
                </span>
                <span className="text-xs text-gray-500">{bytesToSize(file.size)}</span>
            </div>
            {
                /* 
                This is the progress bar, it consists of an outer div that always have a width and height (not invisible)
                and an inner div whose width is determined by 'progress'
                */
            }
            <div className="w-full h-3">
                {uploadingFile === file && progress
                    ?
                    <div
                        style={{width: `${progress * 100}%`}}
                        className="bg-blue-600 transition-all h-3 rounded-r-sm"
                    />
                    : null
                }
            </div>
        </li>
    );
}