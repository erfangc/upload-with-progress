# File Upload with Progress

## End Result

![img.png](img.png)

## How to Use?

```js
function App() {
    return (
        <FileUploader url='http://localhost:8080/upload'/>
    );
}
```

## How Does it Work?

Most business logic are in [FileUploaderProvider](src%2FFileUploader%2FFileUploaderProvider.js), which tracks
state of what files are staged for upload, what files have been uploaded. [FileUploaderProvider](src%2FFileUploader%2FFileUploaderProvider.js) also
contains functions to turn each `File` into `FormData` and invoke a server URL to POST the `FormData` to.

Server-side code can be found [here](https://github.com/erfangc/upload-with-progress-server).

[FileUploaderProvider](src%2FFileUploader%2FFileUploaderProvider.js) exposes its state through the [useFileUploaderContext](src%2FFileUploader%2Fhooks%2FuseFileUploaderContext.js)
hook. Descendant components uses this hook to obtain read-only upload states and render upload progress with animations.