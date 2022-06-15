import { ImageFileNotFound, ProductNotFound } from "../../domain/error";
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

    async getFilePathById(id: number) {
        try {
            const p = await prisma.product.findUnique({
                where: {
                    id
                },
                select: {
                    imagePath: true
                }
            })

            if(p) {
                return p.imagePath
            } else {
                throw new ImageFileNotFound("image not found")
            }
        } catch(e) {
            throw e
        }
    }

    async getById(id: number) {
        try {
            const productPrisma = await prisma.product.findUnique({
                where: {
                    id
                }
            })

            if(productPrisma) {
                const product: Product = {
                    id: productPrisma.id,
                    cartDesc: productPrisma.cartDesc,
                    imagePath: productPrisma.imagePath,
                    longDesc: productPrisma.longDesc,
                    name: productPrisma.name,
                    price: productPrisma.price,
                    published: productPrisma.published,
                    sku: productPrisma.sku,
                    stock: productPrisma.stock
                }

                return product
            } else {
                throw new ProductNotFound("cannot find product")
            }
        } catch(e) {
            throw e
        }
    }

    async create(p: Product) {
        try {
            await prisma.product.create({
                data: {
                    cartDesc: p.cartDesc,
                    imagePath: p.imagePath,
                    longDesc: p.longDesc,
                    name: p.name,
                    price: p.price,
                    published: p.published,
                    sku: p.sku,
                    stock: p.stock
                }
            })

            return null
        } catch(e) {
            throw e
        }
    }
}