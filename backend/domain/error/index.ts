class HTTPError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message)
    }
}

export class ImageFileNotFound extends HTTPError {
    constructor(message: string, public statusCode: number) {
        super(message, statusCode)
    }
}