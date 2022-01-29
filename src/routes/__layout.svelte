<script lang="ts">
    import "../app.scss";
    import { page } from '$app/stores';

    $: pages = [{
        title: "Home",
        path: "/",
    }, {
        title: "Policy",
        path: "/policy",
    }, {
        title: "Zoning 101",
        path: "/zoning",
    }, {
        title: "Contact Us",
        path: "/contact",
    }].map(obj => ({
        ...obj,
        classNames: `${$page.url.pathname === obj.path ? 'active' : ''}`,
    }));

    function closeMenu() {
        const elem = document.getElementById('collapse-button');
        if (window.getComputedStyle(elem).display !== "none") elem.click();
    }
</script>

<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-2">
        <a class="navbar-brand text-primary" href="/" style="flex-grow: 1">Livable Portland</a>
        <button id="collapse-button" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" style="flex-grow: 0">
            <ul class="navbar-nav">
                {#each pages as page}
                    <li class="nav-item">
                        <a
                            class="nav-link {page.classNames}"
                            href="{page.path}"
                            on:click={closeMenu}
                        >
                            {page.title}
                        </a>
                    </li>
                {/each}
            </ul>
        <a class="d-inline-form btn btn-secondary" href="/get-involved" on:click={closeMenu}>Get Involved</a>
        </div>
    </nav>
    <div id="under-nav" class="container text-center">
        <slot/>
    </div>
</div>