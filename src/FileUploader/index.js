import {FileUploaderProvider} from "./FileUploaderProvider";
import {FileUploadDragAndDrop} from "./FileUploadDragAndDrop";

/**
 *
 * @param {string} url
 * @returns {JSX.Element}
 * @constructor
 */
export function FileUploader({url}) {
    return (
        <FileUploaderProvider url={url}>
            <FileUploadDragAndDrop/>
        </FileUploaderProvider>
    );
}