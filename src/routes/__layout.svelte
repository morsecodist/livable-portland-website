<script lang="ts">
    import "../app.scss";
    import { page } from '$app/stores';

    $: pages = [{
        title: "Home",
        path: "/",
    }, {
        title: "Issues",
        path: "/issues",
    }, {
        title: "Zoning 101",
        path: "/zoning",
    }, {
        title: "Contact Us",
        path: "/contact",
    }].map(obj => ({
        ...obj,
        classNames: `${$page.path === obj.path ? 'active' : ''}`,
    }));
</script>

<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-2">
        <a class="navbar-brand text-primary" href="/" style="flex-grow: 1">Livable Portland</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" style="flex-grow: 0">
            <ul class="navbar-nav">
                {#each pages as page}
                    <li class="nav-item">
                        <a class="nav-link {page.classNames}" href="{page.path}">{page.title}</a>
                    </li>
                {/each}
            </ul>
        <a class="d-inline-form btn btn-secondary" href="/get-involved">Get Involved</a>
        </div>
    </nav>
    <div id="under-nav" class="container text-center">
        <slot/>
    </div>
</div>