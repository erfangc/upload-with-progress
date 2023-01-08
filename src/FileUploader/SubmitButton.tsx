import {useFileUploaderContext} from "./hooks/useFileUploaderContext";
import * as React from "react";

export function SubmitButton() {
    const {handleSubmit} = useFileUploaderContext();
    return (
        <button
            onClick={handleSubmit}
            className="px-2.5 py-1.5 bg-blue-700 rounded-sm text-white text-sm hover:bg-blue-500"
        >
            Submit Files
        </button>
    );
}