import * as React from "react";
import {FileUploader} from "./FileUploader";

function App() {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center">
            {/* Server implementation: https://github.com/erfangc/upload-with-progress-server */}
            <FileUploader url='http://localhost:8080/upload'/>
        </main>
    );
}

export default App;
