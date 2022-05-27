<script>
import axios from "axios";
import { writable } from "svelte/store";
import { SERVER_URL } from "../env";

export let params
let product = writable({})
let inputImg
let image
let imageUpdated = false

function imageChange() {
  const file = inputImg.files[0]

  if(file) {
    imageUpdated = true

    const reader = new FileReader()
    reader.addEventListener("load", function() {
      image.setAttribute("src", reader.result)
    })
    reader.readAsDataURL(file)

    return
  }

  imageUpdated = false
}


async function fetchFilled() {
    let res = axios.get(`${SERVER_URL}/product/${params.id}`)
    let data = (await res).data
    $product = data.product
}

async function submitStuff() {}
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
      <textarea name="cartDesc" cols="5" rows="5" 
      required bind:value={$product.cartDesc}></textarea>
    </div>
    <div class="field">
      <label for="desc">Product description</label>
      <textarea name="desc" cols="5" 
      rows="5" required bind:value={$product.desc}></textarea>
    </div>
    <div class="field">
      <label for="stock">Stock</label>
      <input type="number" name="stock" bind:value={$product.stock}>
    </div>
    <div class="field">
      <label for="">Published</label>
      <div class="published">
        <label>
          <input type="radio" bind:group={$product.published} name="published" value={true}>
          <span>yes</span> 
        </label>
        <label>
          <input type="radio" bind:group={$product.published} name="published" value={false}>
          <span>no</span> 
        </label>
      </div>
    </div>
    <div class="imager">
      {#if imageUpdated}
        <img bind:this={image} alt="product updated">
      {:else}
        <img src={$product.imageUrl} alt={`product ${params.id}`}>
      {/if}
      <input type="file" bind:this={inputImg} on:change={imageChange}>
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

form {
    margin-left: 6rem;
}

.field {
    display: flex;
    flex-direction: column;
    margin: .6rem;
}

.field label{
    margin-bottom: .4rem;
}

input[type="radio"] + span {
    margin-right: .7rem;
}

.published {
    display: flex;
}
</style>