export type Product = {
    id: number
    sku: string
    name: string
    price: number
    weight: number
    cartDesc: string
    longDesc: string
    imagePath: string
    categories: Category[]
    stock: number
    published: boolean
}

export type Category = {
    id: number
    name: string
}