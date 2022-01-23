<script lang="ts" context="module">
    export async function load({ page, fetch }) {
        const res = await fetch(`${page.path}.json`);

        if (res.ok) {
            const obj = await res.json();
            return {
                props: {
                    content: obj.content,
                    ...obj.data,
                },
            };
        }

        return {
            status: res.status,
            error: new Error(`Could not load ${page.path}`),
        };
    }
</script>

<script lang="ts">
    import MarkdownArticle from "../../components/MarkdownArticle.svelte"
    export let title: string;
    export let content: string;
</script>

<style>
    :global(img) {
        width: 100%;
    }
</style>

<svelte:head>
    <title>Livable Portland - {title}</title>
</svelte:head>

<h1 class="text-primary">{title}</h1>
<MarkdownArticle content={content}/>

