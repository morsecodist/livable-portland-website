
<script lang="ts" context="module">
    export async function load({ fetch }) {
        const res = await fetch("/news.json");

        if (res.ok) {
            return {
                props: {
                    posts: (await res.json()).sort((a: any, b: any) => a.date > b.date),
                },
            };
        }

        return {
            status: res.status,
            error: new Error(`Could not load policy.json`),
        };
    }
</script>

<script lang="ts">
    import ArticleCard from '../../components/ArticleCard.svelte';
    export let posts: Post[];
</script>

<svelte:head>
    <title>Livable Portland - Newsletters</title>
</svelte:head>

<h1 class="text-primary">Livable Portland News</h1>


<div class="text-start">
    {#each posts as post}
        <div>
            <p><a href="/news/{post.slug}">{post.title}</a></p>
            <p>{post.description}
        </div>
    {/each}
</div>
