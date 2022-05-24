class HTTPError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message)
    }
}

export class ImageFileNotFound extends HTTPError {
    constructor(message: string) {
        super(message, 404)
    }
}

export class ProductNotFound extends HTTPError {
    constructor(message: string) {
        super(message, 404)
    }
}

export class ServerAddrAndPortErr extends HTTPError {
    constructor(message: string, public httpMsg: string) {
        super(message, 500)
    }
}