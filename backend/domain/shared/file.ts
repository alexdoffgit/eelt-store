import { ReadStream } from "fs";

export interface FileGetter {
    getFile: (path: string) => Promise<ReadStream>
}