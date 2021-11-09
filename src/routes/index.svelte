<script lang="ts" context="module">
    import type { Post } from "../types/post";
    export async function load({ fetch }) {
        const res = await fetch("/ideas.json");

        if (res.ok) {
            return {
                props: {
                    posts: (await res.json()).sort((a: Post, b: Post) => a.rank > b.rank),
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
    export let posts: Post[];
</script>

<svelte:head>
    <title>Livable Portland</title>
</svelte:head>

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
