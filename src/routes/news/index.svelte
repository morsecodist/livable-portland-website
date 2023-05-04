
<script lang="ts" context="module">
    export async function load({ fetch }) {
        const res = await fetch("/news.json");

        if (res.ok) {
            return {
                props: {
                    posts: await res.json(),
                },
            };
        }

        return {
            status: res.status,
            error: new Error(`Could not load news.json`),
        };
    }
</script>

<script lang="ts">
    import ArticleCard from '../../components/ArticleCard.svelte';
    export let posts: Post[];
</script>

<svelte:head>
    <title>Urbanist Coalition of Portland - Newsletters</title>
</svelte:head>

<h1 class="text-primary">Urbanist Coalition of Portland News</h1>

<p>We have changed our name from "Livable Portland", as well as switched to an email newsletter in a different format. These posts are rather old use the old name but we are keeping them up for now so people can learn more about the group but we may take them down when we add more new information and updates to the site.</p>

<div class="text-start">
    {#each posts as post}
        <div>
            <p><a href="/news/{post.slug}">{post.title}</a></p>
            <p>{post.description}
        </div>
    {/each}
</div>
