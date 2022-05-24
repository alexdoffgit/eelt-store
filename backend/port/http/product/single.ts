import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { ProductListResponse } from "../../../domain/dto/product";
import { ProductNotFound, ServerAddrAndPortErr } from "../../../domain/error";
import { IProduct, Product } from "../../../domain/model/product";

function productListAdapter(
    p: Product,
    address: string,
    port: string
): ProductListResponse {
    return {
        id: p.id,
        cartDesc: p.cartDesc,
        desc: p.longDesc,
        imageUrl: `${address}:${port}/product/image/${p.id}`,
        price: p.price,
        published: p.published,
        sku: p.sku,
        stock: p.sku,
        name: p.name
    }
}

export function product(store: IProduct) {
    return async function (req: Request, res: Response) {
        try {
            const productPrisma = await store.getById(
                Number(req.params.id)
            )
            const addr = process.env.SERVER_ADDR
            const port = process.env.SERVER_PORT

            if (addr && port) {
                const payload = productListAdapter(
                    productPrisma, addr, port
                )

                res.json(payload)
            } else {
                throw new ServerAddrAndPortErr("can't read env value of SERVER_ADDR and SERVER_PORT")
            }
        } catch(e) {
            if(e instanceof ServerAddrAndPortErr) {
                console.error(e.message)
                res.status(e.statusCode)
                res.send(e.httpMsg)
            } else if(e instanceof ProductNotFound) {
                console.error(e.message)
                res.status(e.statusCode)
                res.send(e.message)
            } else if(e instanceof PrismaClientKnownRequestError) {
                console.error(`${e.code}: ${e.message}`)
                res.status(500)
                res.send("internal server error")
            } else {
                console.error((e as any).message)
                res.status(500)
                res.send("internal server error")
            }
        }

    }
}