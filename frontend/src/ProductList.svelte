<script type="ts">

</script>

<div class="bg">
    <!-- Put Category in search list, i want meilisearch -->
    <table>
        <thead>
            <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Description</th> <!-- longDesc -->
                <th>Stock</th>
                <th>Published</th>
            </tr>
        </thead>
    </table>
</div>

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