<script>
import { onDestroy } from "svelte";
import axios from "axios";
import { SERVER_URL } from "../env";

let controller = new AbortController()
async function fetchData() {
    let res = axios.get(`${SERVER_URL}/products`, 
        { signal: controller.signal }
    )
    let data = (await res).data
    console.log(await data)
    return await data.products
}

onDestroy(() => {
    controller.abort()
})
</script>

{#await fetchData()}
    <p>Loading...</p>
{:then products} 
<div class="bg">
    <!-- Put Category in search list, i want meilisearch -->
    <table>
        <thead>
            <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Price</th>
                <th>Cart Description</th>
                <th>Description</th> <!-- longDesc -->
                <th>Stock</th>
                <th>Published</th>
            </tr>
        </thead>
        <tbody>
            {#each products as p}
                <tr>
                    <td>{p.sku}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.cartDesc}</td>
                    <td>{p.desc}</td>
                    <td>{p.stock}</td>
                    <td>{p.published}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
{/await}


<style>
    .bg {
        height: 100vh;
        display: grid;
        place-items: center;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }

    th, td {
        padding: .7rem;
    }
</style>