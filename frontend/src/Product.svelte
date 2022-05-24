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
        
    </form>
{/if}