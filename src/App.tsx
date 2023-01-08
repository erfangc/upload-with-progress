import * as React from "react";
import {FileUploader} from "./FileUploader";

function App() {
    return (
        <main className="min-w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
            {/* Server implementation: https://github.com/erfangc/upload-with-progress-server */}
            <div className="shadow-md p-12 bg-white rounded">
                <FileUploader uploadUrl='http://localhost:8080/upload'/>
            </div>
        </main>
    );
}

export default App;
