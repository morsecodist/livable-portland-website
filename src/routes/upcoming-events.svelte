<script lang="ts" context="module">
    export async function load({ fetch }) {
        const res = await fetch("/events.json");
        const events = await res.json();
        
        let currentEvent = events.shift();
        let currentDate = new Date(currentEvent.start.dateTime)
        currentDate.setHours(0, 0, 0, 0)
        let days = [{
            date: currentDate,
            events: [],
        }];
        while (events.length > 0) {
            const eventDate = new Date(currentEvent.start.dateTime)
            eventDate.setHours(0, 0, 0, 0)
            if (eventDate > currentDate) {
                currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
                days.push({
                    date: currentDate,
                    events: [],
                })
            } else if (eventDate.toISOString() === currentDate.toISOString()) {
                days[days.length - 1].events.push(currentEvent)
                currentEvent = events.shift()
            } else {
                throw new Error("events out of order")
            }
        }

        if (res.ok) {
            return {
                props: {
                    days,
                },
            };
        }

        return {
            status: res.status,
            error: new Error(`Could not load events.json`),
        };
    }
</script>

<script lang="ts">
    import { slide } from 'svelte/transition'

    export let days: any;

    const openEvents = {};

    const toggleEvent = (id: string) => ()  => {
        if (openEvents[id]) openEvents[id] = false
        else openEvents[id] = true
    }
</script>

<style lang="scss">
    .daybox {
        text-align: left;
    }

    .datelabel {
        border-bottom: 1px solid black;
        margin-bottom: 4px;
    }

    .eventbox {
        border: 1px solid grey;
        border-radius: 2px;
        margin: 8px 0;
        padding: 2px 4px;
        cursor: pointer;
        background-color: rgb(var(--bs-primary-rgb));
        color: white;
    }
</style>

<svelte:head>
    <title>Livable Portland - Upcoming Events</title>
</svelte:head>

<h1 class="text-primary">Upcoming Events</h1>
<div class="mb-4">
    <p>Keep up to date with upcoming local events including city government meetings, Livable Portland Meetings, Portland Bicycle and Pedestrian Advisory Committee meetings and more! Summaries of city government meeting agendas are auto-generated with GPT-3 so you can decide if you are interested and keep up to date.</p>
    <a class="btn btn-secondary" href="/calendar">View Calendar</a>
    <a class="btn btn-secondary" href="https://calendar.google.com/calendar/u/0?cid=MXFpaWRqbW5ycmw4ZDdmOGh0c2FjdmxvbTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ" target="about:blank">Add to Google Calendar</a>
</div>
{#each days as day}
    <div class="daybox">
        <p class="datelabel">{day.date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}</p>
        
        {#if day.events.length === 0}
            <p>No events</p>
        {:else}
            {#each day.events as calendarEvent}
                <div
                    class="eventbox"
                    on:click={() => openEvents[calendarEvent.id] = !openEvents[calendarEvent.id]}
                >
                    <p>{new Date(calendarEvent.start.dateTime).toLocaleTimeString('en-us', {
                        hour: 'numeric',
                        minute: 'numeric',
                    })} {calendarEvent.summary}</p>
                    {#if openEvents[calendarEvent.id]}
                        <div transition:slide>
                            <p style="margin:0">{calendarEvent.description}</p>
                        </div>
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
{/each}
