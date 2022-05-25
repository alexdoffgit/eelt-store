<script>
import axios from "axios";
import { SERVER_URL } from "../env";
export let params
let product

async function fetchFilled() {
    let res = axios.get(`${SERVER_URL}/product/${params.id}`)
}

async function submitStuff() {

}
</script>

{#if params}
    <form on:submit|preventDefault={submitStuff}>
        <div class="field">
            <label for="name">Name</label>
            <input type="text" name="name">
        </div>
        <div class="field">
            <label for="price">Price</label>
            <input type="number" name="price" required>
        </div>
        <div class="field">
            <label for="cartDesc">Cart description</label>
            <textarea name="cartDesc" cols="30" rows="10" required>
            </textarea>
        </div>
        <div class="field">
            <label for="desc">Product description</label>
            <textarea name="desc" cols="30" rows="10" required>
            </textarea>
        </div>
        <div class="field">
            <label for="stock">Stock</label>
            <textarea name="stock" cols="30" rows="10">
            </textarea>
        </div>
        <div class="field">
            <label for="">Published</label>
            <div class="published">
                <label>
                    <input type="radio" name="published" value={1}>
                    yes
                </label>
                <label>
                    <input type="radio" name="published" value={0}>
                    no
                </label>
            </div>
        </div>
    </form>
{/if}

<style>
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