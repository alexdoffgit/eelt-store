import { ImageFileNotFound, ProductNotFound } from "../../domain/error";
import { IProduct, Product } from "../../domain/model/product";
import { prisma } from "./prisma";
import { nanoid } from "nanoid";
import { createReadStream, createWriteStream } from "fs";
import { Buffer } from "buffer";
import { join } from "path";
import { promisify } from "util";
import { pipeline } from "stream";

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

    async storeFile(file: Buffer, extension: string) {
        try {
            const newFileName = nanoid()
            const filepath = process.env.FILE_STORE
            const pump = promisify(pipeline)

            if(filepath) {
                const fullpath = join(filepath, `${newFileName}.${extension}`)
                const readStream = createReadStream(file)
                const writeStream = createWriteStream(fullpath)
                await pump(readStream, writeStream)

                return fullpath
            } else {
                throw new Error("FILE_STORE is not defined");
                
            }
        } catch(e) {
            throw e
        }
    }
}