<script lang="ts">
    export let title: string;
    export let description: string;
    export let src: string;
    export let href: string;
</script>

<div class="card d-inline-flex" style="width: 24rem; height: 100%;">
    <img src="{src}" class="card-img-top" alt="{title}">
    <div class="card-body">
        <h5 class="card-title text-secondary">{title}</h5>
        <p class="card-text">{description}</p>
    </div>
    <div class="card-footer text-muted text-end">
        <a href="{href}" class="btn btn-primary">Learn More</a>
    </div>
</div>
