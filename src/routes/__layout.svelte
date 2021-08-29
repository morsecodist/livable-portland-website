<script lang="ts">
    import "../app.scss";
</script>

<div class="container text-center py-4">
    <h1 class="text-primary">Livable Portland</h1>
    <p>Designing our city for humans</p>
    <nav>
        <a class="px-2 text-secondary" href="/">Home</a>
        <a class="px-2 text-secondary" href="/issues">Issues</a>
        <a class="px-2 text-secondary" href="/contact">Contact Us</a>
    </nav>
    <div class="px-4 py-4">
        <slot></slot>
    </div>
</div>
