import * as React from "react";
import {FileUploaderContext} from "../FileUploaderContext";

export const useFileUploaderContext = () => React.useContext(FileUploaderContext);