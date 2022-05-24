import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { ProductListResponse } from "../../../domain/dto/product";
import { ImageFileNotFound } from "../../../domain/error";
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
        
    } 
}