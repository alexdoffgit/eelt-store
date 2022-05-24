import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { ProductListResponse } from "../../../domain/dto/product";
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
        stock: p.sku
    }
}

export function productList(store: IProduct) {
    return async function(req: Request, res: Response) {
        try {
            const productsStore = await store.getAll()
            
            if(productsStore.length === 0) {
                res.json({
                    products: []
                })
            } else {
                const addr = process.env.SERVER_ADDR
                const port = process.env.SERVER_PORT
                
                if(addr && port) {
                    res.json({
                        products: productsStore.map(
                            p => productListAdapter(p, addr, port)
                        ) 
                    })
                } else {
                    console.error("SERVER_ADDR and SERVER_PORT env is empty")
                    res.send("internal server error")
                }
            }
        } catch(e) {
            if(e instanceof PrismaClientKnownRequestError) {
                res.status(500)
                console.error(`${e.code}: ${e.message}`)
                res.send("internal server error")
            } else {
                res.status(500)
                console.error((e as any).message)
                res.send("internal server error")
            }
        }
    } 
}