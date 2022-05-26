<script>
import axios from "axios";
import { writable } from "svelte/store";
import { SERVER_URL } from "../env";
export let params
let product = writable({})
let empty

async function fetchFilled() {
    let res = axios.get(`${SERVER_URL}/product/${params.id}`)
    let data = (await res).data
    $product = data.product
}

async function submitStuff() {

}
</script>

{#await fetchFilled()}
<p>wait</p>
{:then} 
<div class="bg">
    <form on:submit|preventDefault={submitStuff}>
        <div class="field">
            <label for="name">Name</label>
            <input type="text" name="name" 
            required bind:value={$product.name}>
        </div>
        <div class="field">
            <label for="price">Price</label>
            <input type="number" name="price" 
            required bind:value={$product.price}>
        </div>
        <div class="field">
            <label for="cartDesc">Cart description</label>
            <textarea name="cartDesc" cols="30" rows="10" 
            required bind:value={$product.cartDesc}></textarea>
        </div>
        <div class="field">
            <label for="desc">Product description</label>
            <textarea name="desc" cols="30" 
            rows="10" required bind:value={$product.desc}></textarea>
        </div>
        <div class="field">
            <label for="stock">Stock</label>
            <textarea name="stock" 
            cols="30" rows="10" bind:value={$product.stock}></textarea>
        </div>
        <div class="field">
            <label for="">Published</label>
            <div class="published">
                <label>
                    <input type="radio" bind:group={$product.published} name="published" value={1}>
                    yes
                </label>
                <label>
                    <input type="radio" bind:group={$product.published} name="published" value={0}>
                    no
                </label>
            </div>
        </div>
    </form>
</div>
{:catch error}
<p>Server Error</p>
{/await}

<style>
.bg {
    height: 100vh;
    display: flex;
    justify-content: start;
    align-items: center;
}

.field {
    display: flex;
    flex-direction: column;
    padding: .8rem;
}

.field label {
    margin-bottom: .4rem;
}

.published {
    display: flex;
}
</style>