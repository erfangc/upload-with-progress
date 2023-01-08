import {FileUploaderProvider} from "./FileUploaderProvider";
import {FileUploadDragAndDrop} from "./FileUploadDragAndDrop";

interface FileUploaderProps {
    url: string
}

/**
 * This is the library component that will render a FileUploader
 * @param {string} url
 * @returns {JSX.Element}
 * @constructor
 */
export function FileUploader({url}: FileUploaderProps) {
    return (
        <FileUploaderProvider url={url}>
            <FileUploadDragAndDrop/>
        </FileUploaderProvider>
    );
}