import { IProduct } from "../../../domain/model/product";
import { Request, Response } from "express";
import { ImageFileNotFound } from "../../../domain/error";


export function productImage(store: IProduct) {
    return async function(req: Request, res: Response) {
        try {
            const imagePath = await store.getFilePathById(Number(req.params.id))

            res.sendFile(imagePath)
        } catch(e) {
            if(e instanceof ImageFileNotFound) {
                res.status(e.statusCode)
                console.error(e.message)
                res.send(e.message)
            } else {
                res.status(500)
                console.error((e as any).message)
                res.send("internal server error")
            }
        }
    }
}