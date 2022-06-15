import express from "express";
import { ProductImplemented } from "./adapter/prisma-mysql/product";
import { productImage } from "./port/http/product/image";
import { productList } from "./port/http/product/list";
import { product as productSingle } from "./port/http/product/single";
import multer from "multer";
import { join, extname } from "path";
import { cwd } from "process";

let dotenv = require('dotenv')
let dotenvExpand = require('dotenv-expand')

let myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

const storepath = process.env.FILE_STORE

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, storepath ? storepath : join(cwd(), 'storage'))
    },
    filename: function(req, file, callback) {
        callback(null, `${Date.now()}.${extname(file.originalname)}`)
    }
})

const upload = multer({
    storage
})

const app = express()

const product = new ProductImplemented()

if(process.env.SERVER_PORT) {
    app.get("/product/:id", productSingle(product))
    app.get("/products", productList(product))
    app.get("/product/image/:id", productImage(product))
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`server listening on port: ${process.env.SERVER_PORT}`)
    })
} else {
    process.exit()
}

