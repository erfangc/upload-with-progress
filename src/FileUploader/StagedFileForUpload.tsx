import {bytesToSize} from "./bytesToSize";
import * as React from "react";
import {FileIcon} from "./FileIcon";
import {StagedFile} from "./FileUploaderContext";

interface StagedFileForUploadProps {
    stagedFile: StagedFile
}

export function StagedFileForUpload({stagedFile}: StagedFileForUploadProps) {
    const {file, progress, completed} = stagedFile;
    return (
        <li className="w-full shadow pt-4 pb-2 px-3 rounded-md transition-shadow hover:shadow-lg cursor-pointer duration-300 flex flex-row">
            <FileIcon stagedFile={stagedFile}/>
            <div className="w-full ml-2">
                <div className="flex flex-row items-center justify-between">
                    <span className={`text-sm transition-all duration-300 text-gray-800`}>
                        {file.name}
                    </span>
                    <span className="text-xs text-gray-500">{bytesToSize(file.size)}</span>
                </div>
                <div className="h-4">
                    {
                        /* 
                        This is the progress bar, it consists of an outer div that always have a width and height (not invisible)
                        and an inner div whose width is determined by 'progress'
                        */
                    }
                    {progress && !completed
                        ?
                        <div
                            style={{width: `${progress * 100}%`}}
                            className="bg-blue-600 transition-all h-4 rounded-r flex flex-row justify-end"
                        >
                            <p className="text-white text-xs mr-1">{(progress * 100).toFixed(0)}%</p>
                        </div>
                        : null
                    }
                </div>
            </div>
        </li>
    );
}