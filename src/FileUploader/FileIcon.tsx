import {useFileUploaderContext} from "./hooks/useFileUploaderContext";
import * as React from "react";
import {useMemo} from "react";
import {
    AiFillCheckCircle,
    AiFillFile,
    AiFillFileExcel,
    AiFillFileImage,
    AiFillFilePdf,
    AiFillFileText
} from "react-icons/ai";
import {MdMovie} from "react-icons/md";

interface FileIconProps {
    file: File;
}

const size = 32;
const style = {height: size, width: size};

export function FileIcon({file}: FileIconProps) {

    const {completedFiles} = useFileUploaderContext();
    const isComplete = useMemo(() => completedFiles.includes(file), [completedFiles, file]);
    const type = file.type;

    if (isComplete) {
        return <AiFillCheckCircle className="text-emerald-500" style={style}/>;
    } else {
        switch (type) {
            case 'image/jpeg':
            case 'image/png':
                return <AiFillFileImage className="text-blue-600" style={style}/>;
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return <AiFillFileExcel className="text-green-700" style={style}/>;
            case 'application/pdf':
                return <AiFillFilePdf className="text-red-800" style={style}/>;
            case 'text/plain':
                return <AiFillFileText className="text-gray-500" style={style}/>;
            case 'video/quicktime':
                return <MdMovie className="text-rose-700" style={style}/>;
            default:
                return <AiFillFile className="text-gray-500" style={style}/>;
        }
    }
}