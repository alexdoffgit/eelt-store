import { Request, Response } from "express";
import { ProductListResponse } from "../../../domain/dto/product";
import { IProduct, Product } from "../../../domain/model/product";

function productListAdapter(p: Product): ProductListResponse | null {
    const address = process.env.SERVER_ADDR
    const port = process.env.SERVER_PORT
    if(address && port) {
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

    return null
}

export function productList(store: IProduct) {
    return async function(req: Request, res: Response) {
        
    } 
}