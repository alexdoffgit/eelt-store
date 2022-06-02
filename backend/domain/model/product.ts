export type Product = {
    id: number
    sku: string
    name: string
    price: number
    cartDesc: string
    longDesc: string
    imagePath: string
    stock: number
    published: boolean
}

export interface IProduct {
    getAll: () => Promise<Product[]>
    getFilePathById: (id: number) => Promise<string>
    getById: (id: number) => Promise<Product>
    storeFile: (filename: string) => Promise<string>
}