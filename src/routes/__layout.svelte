<script lang="ts" context="module">
    export async function load({ page, fetch }) {
        return {
            props: {
                path: page.path,
            },
        }
    }
</script>

<script lang="ts">
    import "../app.scss";
    export let path: string = "/";

    const pages = [{
        title: "Home",
        path: "/",
    }, {
        title: "Issues",
        path: "/issues",
    }, {
        title: "Contact Us",
        path: "/contact",
    }].map(obj => ({
        ...obj,
        classNames: `nav-link ${path === obj.path ? 'active' : ''}`,
    }));
</script>

<div class="p-4">
    <div class="d-flex">
    <div class="d-inline-block" style="flex-grow: 1">
        <h1 class="text-primary">Livable Portland</h1>
        <p>Designing our city for humans</p>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    {#each pages as page}
                        <li class="nav-item">
                            <a class="{page.classNames}" href="{page.path}">{page.title}</a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </nav> 
    <div class="d-inline-block" style="margin: auto">
        <a class="btn btn-secondary">Get Involved</a></div>
    </div>
    <div class="container text-center px-4 py-4">
        <slot></slot>
    </div>
</div>
