<script lang="ts" context="module">
    export async function load({ page, fetch }) {
        const res = await fetch("/ideas.json");

        if (res.ok) {
            return {
                props: {
                    posts: (await res.json()),
                },
            };
        }

        return {
            status: res.status,
            error: new Error(`Could not load ideas.json`),
        };
    }
</script>

<script lang="ts">
    import ArticleCard from '../components/ArticleCard.svelte';
    export let posts: obj[];
</script>

<svelte:head>
    <title>Livable Portland</title>
</svelte:head>

<div class="container">
    <div class="row g-4">
            {#each posts as post}
                <div class="col">
                <ArticleCard 
                     src="{post.image}"
                     href="/ideas/{post.slug}"
                     title="{post.title}"
                     description="{post.description}"
                />
            </div>
        {/each}
    </div>
</div>
