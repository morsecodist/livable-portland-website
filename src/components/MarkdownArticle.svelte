<script lang="ts">
    import { marked } from "marked";
    export let content: string = "";
</script>

<div class="text-start">
    { @html marked(content) }
</div>
