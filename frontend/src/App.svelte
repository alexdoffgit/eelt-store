<script>
import ProductList from "./ProductList.svelte";
import page from "page";

let current
let params

page("/products", () => current = ProductList)
page("/product/:id", (ctx, next) => {
    params = ctx.params
    next()
}, () => current = Product)

</script>

<svelte:component this={current} {params} />