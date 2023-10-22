<script lang="ts">
	import { horizontalSlide } from '../lib/horizontal-slide';

	export let title = 'asdasd';
	export let bulletActive = false;
	export let lineActive = false;
	export let backgroundColor = 'red';
	export let icon: string;
	export let iconOnly = false;

	let color = 'black';

	let componentClass = 'component';
	// add active and lineActive

	if (bulletActive) {
		componentClass += ' active';
	}

	if (lineActive) {
		componentClass += ' lineActive';
	}

	$: wrapperStyles = `background-color: ${backgroundColor}`;
</script>

<div class={'component ' + componentClass} on:click on:keydown style={wrapperStyles}>
	<div class="bulletContainer bulletContainerWithChild" on:click on:keydown>
		<img src={icon} alt="Timeline item" />
	</div>
	{#if !iconOnly}
		<div class="container" transition:horizontalSlide={{}}>
			{#if title}
				<h6 class="text-bold">{title}</h6>
			{/if}
			<div class="content">
				<slot />
			</div>
		</div>
	{/if}
</div>

<style>
	/* Root styles */
	.component {
		position: relative;
		box-sizing: border-box;
		text-align: left; /* Default alignment */
		font-family: Arial, sans-serif; /* Default font */
		padding-left: 20px; /* Default for theme.space.xlPX.value if left aligned */
		cursor: pointer;
		padding: 4px;
		min-width: 40px;
		margin-left: 20px;
		min-height: 100px;
	}

	.component:not(:last-of-type)::before {
		display: block;
	}

	.component:not(:first-of-type) {
		margin-top: 20px; /* Default for theme.space.xlPX.value */
	}

	.component::before {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		bottom: -30px; /* Default for theme.space.xl.value */
		left: -1px; /* Default for left align */
		border-left: 3px solid gray; /* Default lineWidth and color */
		content: '';
		display: none;
		z-index: 2;
	}

	.component.lineActive::before {
		border-left-color: dimgray; /* Default backgroundColor */
	}

	.component.active .bulletContainer {
		border-color: black; /* Default backgroundColor */
		background-color: white; /* Default background color */
	}

	.component.active .bulletContainerWithChild {
		background-color: gray; /* Default background color */
		color: white; /* Default color */
	}

	/* bulletContainer styles */
	.component .bulletContainer {
		box-sizing: border-box;
		width: 28px; /* Default bulletSize */
		height: 28px; /* Default bulletSize */
		border-radius: 50%; /* Default to a circle */
		border: 2px solid black; /* Default lineWidth and color */
		background-color: white; /* Default background color */
		position: absolute;
		top: 0;
		left: -14px; /* Default for left align: half of bulletSize (10px) + lineWidth (2px) */
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		z-index: 3;
	}

	/* bulletContainerWithChild styles */
	.component .bulletContainerWithChild {
		border-width: 2px;
		background-color: white; /* Default background color */
		color: black; /* Default color */
	}

	/* title styles */
	.title {
		font-weight: 500;
		line-height: 1;
		margin-bottom: 8px; /* Default for theme.space.xs.value / 2 */
		text-align: left; /* Default alignment */
	}
</style>
