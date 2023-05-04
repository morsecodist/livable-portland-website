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
    <title>Urbanist Coalition of Portland</title>
</svelte:head>

<h1 class="text-primary">Welcome to the Urbanist Coalition of Portland!</h1>

<p>Join us on <a href="https://discord.gg/EBF8EUN2RK" target="_blank">Discord</a>!</p>

<p>The Urbanist Coalition of Portland (formerly Livable Portland) is a political group with the goal of making Portland, Maine more livable for everyone. We recently changed our name from "Livable Portland" to avoid confusion with the Maine DSA's campaign of the same name. We believe in improving our city by supporting middle density mixed-use neighborhoods. Our policies and approach are strongly inspired by the YIMBY movement, Strong Towns, and more. If you thing building housing is a good thing and think people shouldn't need to drive everywhere you will fit right in. Our big ideas are:</p>

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
