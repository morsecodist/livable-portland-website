<script lang="ts" context="module">
    import type { Post } from "../../types/post";
    export async function load({ fetch }) {
        const res = await fetch("/policy.json");

        if (res.ok) {
            return {
                props: {
                    posts: (await res.json()).sort((a: Post, b: Post) => a.rank > b.rank),
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
    <title>Livable Portland</title>
</svelte:head>

<h1 class="text-primary">Policy Goals</h1>

<p>These policy goals are a work in progress but they communicate our major aims. If you have feedback or suggestions for improving these policies we'd love to hear it please <a href="/get-involved">get involved!</a></p>

<div class="row g-4 p-4">
        {#each posts as post}
            <div class="col">
            <ArticleCard 
                 src="{post.image}"
                 href="/policy/{post.slug}"
                 title="{post.title}"
                 description="{post.description}"
            />
        </div>
    {/each}
</div>