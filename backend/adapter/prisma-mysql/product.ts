import { IProduct, Product } from "../../domain/model/product";
import { prisma } from "./prisma";

export class ProductImplemented implements IProduct {
    async getAll() {
        let productsPrisma = await prisma.product.findMany()

        return productsPrisma.map(p => {
            let products: Product = {
                id: p.id,
                cartDesc: p.cartDesc,
                imagePath: p.imagePath,
                longDesc: p.longDesc,
                name: p.name,
                price: p.price,
                published: p.published,
                sku: p.sku,
                stock: p.stock
            }

            return products
        })
    }
}