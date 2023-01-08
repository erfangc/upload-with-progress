import {useFileUploaderContext} from "./hooks/useFileUploaderContext";
import * as React from "react";
import {BiUpload} from "react-icons/bi";
import {ImSpinner8} from 'react-icons/im';

const style = {height: 20, width: 20};

export function SubmitButton() {
    const {handleSubmit, busy} = useFileUploaderContext();
    return (
        <div className="flex flex-row justify-end">
            <button
                onClick={handleSubmit}
                className={`w-32 justify-center py-1.5 rounded text-white text-sm 
                ${busy ? 'bg-blue-400' : 'bg-blue-700 hover:bg-blue-500'}
                 flex flex-row items-center space-x-1`}
                disabled={busy}
            >
                {
                    busy
                        ? <ImSpinner8 style={style} className="animate-spin"/>
                        : <><BiUpload style={style}/><span>Submit Files</span></>
                }
            </button>
        </div>
    );
}