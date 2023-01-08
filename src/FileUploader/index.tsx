import {FileUploaderProvider} from "./FileUploaderProvider";
import {FileUploadDragAndDrop} from "./FileUploadDragAndDrop";

interface FileUploaderProps {
    uploadUrl: string
}

/**
 * This is the library component that will render a FileUploader
 */
export function FileUploader({uploadUrl}: FileUploaderProps) {
    /**
     * The implementation of this component uses a Context pattern. Normally React Context creates
     * hidden coupling and undeclared dependencies. However, in this localized context - every context value
     * has to do with upload and are bound in the DOM by where this component `FileUploader` is mounted thus it is an
     * acceptable use of Context
     * 
     * Moreover, when using React Context pattern, business logic, interaction logic should be centralized in the provider, and it's
     * associated hooks. This component follows that best practice by putting all the interaction logic in `FileUploaderProvider` 
     */
    return (
        <FileUploaderProvider uploadUrl={uploadUrl}>
            <FileUploadDragAndDrop/>
        </FileUploaderProvider>
    );
}