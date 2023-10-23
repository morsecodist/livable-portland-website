<script lang="ts">
	import { marked } from 'marked';
	import { horizontalSlide } from '../lib/horizontal-slide';

	interface Event {
		name: string;
		kind: 'email' | 'public-comment' | 'reading';
		description: string;
		dateTime: Date;
		link: string;
		email?: {
			to: string;
			subject: string;
			template: string;
		};
	}

	export let events = [] as Event[];
	$: sortedEvents = events.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
	$: nextEventIdx = sortedEvents.findIndex((event) => event.dateTime > new Date());
	$: selectedIdx = nextEventIdx;
	$: selectedEvent = sortedEvents[selectedIdx];
	$: emailBody = selectedEvent.email && selectedEvent.email.template;

	$: mailToLink =
		selectedEvent.email &&
		`mailto:${selectedEvent.email.to}?subject=${selectedEvent.email.subject}&body=${emailBody}`;

	function copyToClipboard() {
		navigator.clipboard.writeText(emailBody);
	}

	import TimelineItem from './TimelineItem.svelte';

	import Envelope from 'bootstrap-icons/icons/envelope.svg';
	import Megaphone from 'bootstrap-icons/icons/megaphone.svg';
	import Book from 'bootstrap-icons/icons/book.svg';

	import EnvelopeCheck from 'bootstrap-icons/icons/envelope-check.svg';
	import Check from 'bootstrap-icons/icons/check.svg';

	const iconMap = {
		email: Envelope,
		'public-comment': Megaphone,
		reading: Book
	};

	const iconMapComplete = {
		email: EnvelopeCheck,
		'public-comment': Check,
		reading: Check
	};

	let innerWidth = 0;
	let innerHeight = 0;

	$: smallScreen = innerWidth < 1000;
	$: {
		console.log(innerWidth);
	}

	$: showDetailsPanel = !smallScreen;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="d-flex justify-content-center">
	{#if !smallScreen || !showDetailsPanel}
		<div class="pt-3" style="min-width: 20%">
			{#each sortedEvents as event, index}
				<TimelineItem
					title={event.name}
					icon={nextEventIdx > index ? iconMapComplete[event.kind] : iconMap[event.kind]}
					on:click={() => {
						if (!smallScreen || !showDetailsPanel) {
							selectedIdx = index;
						}
						if (smallScreen) {
							showDetailsPanel = !showDetailsPanel;
						}
					}}
					backgroundColor={selectedIdx === index ? '#B3D1B2' : 'inherit'}
					lineActive={nextEventIdx > index}
					bulletActive={nextEventIdx > index}
				>
					<p>{event.dateTime.toLocaleDateString()} {event.dateTime.toLocaleTimeString()}</p>
				</TimelineItem>
			{/each}
		</div>
	{/if}

	{#if showDetailsPanel}
		<div
			class="d-flex flex-column mt-3 flex-grow-1 text-start p-4"
			style="background-color: #B3D1B2; border-top-right-radius: 10px; border-bottom-right-radius: 10px;"
			transition:horizontalSlide={{}}
		>
			{#if smallScreen}
				<button class="btn btn-secondary mb-3" on:click={() => (showDetailsPanel = false)}
					>Back to Timeline</button
				>
			{/if}
			<h3>{selectedEvent.name}</h3>
			<div>{@html marked(selectedEvent.description)}</div>
			{#if selectedEvent.email}
				<label for="to-input">To</label>
				<input
					id="to-input"
					type="email"
					class="form-control"
					value={selectedEvent.email.to}
					disabled
				/>
				<label for="subject-input">Subject</label>
				<input id="subject-input" class="form-control" bind:value={selectedEvent.email.subject} />
				<label for="body-input">Message</label>
				<textarea
					id="body-input"
					bind:value={selectedEvent.email.template}
					class="form-control flex-grow-1"
					rows="5"
				/>
				<div class=" mt-3 text-end">
					<button class="btn btn-primary" on:click={copyToClipboard}>Copy</button>
					<a class="btn btn-secondary" href={mailToLink}>Open in Email</a>
				</div>
			{/if}
		</div>
	{/if}
</div>
