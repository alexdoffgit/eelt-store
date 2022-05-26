<script>
import Fallback from "./Fallback.svelte";
import ProductList from "./ProductList.svelte";
import page from "page";
import ProductUpdate from "./ProductUpdate.svelte";

let current
let params

page("/", () => current = Fallback)
page("/products", () => current = ProductList)
page("/product/:id", (ctx, next) => {
    params = ctx.params
    next()
}, () => current = ProductUpdate)
page()

</script>

<svelte:component this={current} params={params} />