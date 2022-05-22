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

<h1 class="text-primary">Welcome to Livable Portland!</h1>

<p>Join us on <a href="https://discord.gg/EBF8EUN2RK" target="_blank">Discord</a>!</p>

<p>Livable Portland is a political group that looks to make Portland, Maine more livable for everyone. We believe in making that happen through supporting middle density mixed-use communities. Livable Portland is non-partisan and we believe that our policies can appeal to people wherever they are on the political spectrum. Our policies and approach are strongly inspired by the YIMBY movement, Strong Towns, and more. If you like building housing and think people shouldn't need to drive everywhere you will fit right in. Our big ideas are:</p>

<div class="row g-4 pb-4">
        {#each posts as post}
            <div class="col">
            <ArticleCard 
                 src="{post.image}"
                 title="{post.title}"
                 description="{post.description}"
            />
        </div>
    {/each}
</div>
