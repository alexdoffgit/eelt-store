import express from "express";
import { ProductImplemented } from "./adapter/prisma-mysql/product";
import { productImage } from "./port/http/product/image";
import { productList } from "./port/http/product/list";

let dotenv = require('dotenv')
let dotenvExpand = require('dotenv-expand')

let myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

const app = express()
const product = new ProductImplemented()

if(process.env.SERVER_PORT) {
    app.get("/products", productList(product))
    app.get("/product/image/:id", productImage(product))
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`server listening 
        on port: ${process.env.SERVER_PORT}`)
    })
} else {
    process.exit()
}

