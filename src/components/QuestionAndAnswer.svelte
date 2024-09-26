<script>
	export let question;
	export let answers;
	export let candidates;
	export let activeCandidateId;

	let expanded = false;
	let currentIndex = 0;

	function toggle() {
		expanded = !expanded;
		if (!expanded) {
			currentIndex = 0; // reset index when closed
		}
	}

	function next() {
		if (currentIndex < candidates.length - 1) {
			currentIndex++;
		}
	}

	function previous() {
		if (currentIndex > 0) {
			currentIndex--;
		}
	}

	let article;
	$: {
		if (answers && answers.length > 0 && candidates && candidates.length > 0) {
			if (currentIndex >= candidates.length) {
				currentIndex = 0;
			}
			let candidate = candidates[currentIndex];
			if (!candidate) {
				currentIndex = 0;
				candidate = candidates[currentIndex];
			}
			const candidateAnswers = answers.find((a) => a.candidateId === candidate.candidateId);
			if (candidateAnswers) {
				const answer = candidateAnswers.answers.find((a) => a.questionId === question.questionId);
				article = answer ? answer.answer : 'No answer available';
				currentIndex = candidates.findIndex((c) => c.candidateId === candidate.candidateId);
			} else {
				article = 'No answer available';
			}
			if (activeCandidateId) {
				const candidateAnswers = answers.find((a) => a.candidateId === activeCandidateId);
				if (candidateAnswers) {
					const answer = candidateAnswers.answers.find((a) => a.questionId === question.questionId);
					currentIndex = candidates.findIndex((c) => c.candidateId === activeCandidateId);
					article = answer ? answer.answer : 'No answer available';
				} else {
					article = 'No answer available';
				}
			}
		} else {
			article = 'No answer available';
		}
	}
	console.log(article);
</script>

<div class="card question-card" class:hoverable={!expanded}>
	<button
		class="clickable-question"
		on:click={toggle}
		on:keydown={(e) => e.key === 'Enter' && toggle()}
		tabindex="0"
	>
		<div><strong>{question.questionId}.</strong></div>
		<div>
			{question.question}
		</div>
	</button>

	{#if expanded}
		{#if !activeCandidateId}
			<div class="buttons">
				<button class="btn btn-primary" on:click={previous} disabled={currentIndex === 0}
					>Previous</button
				>
				<div class="pagination">
					{#each candidates as _, index}
						<span class={index === currentIndex ? 'active-circle' : 'circle'} />
					{/each}
				</div>
				<button
					class="btn btn-primary"
					on:click={next}
					disabled={currentIndex === candidates.length - 1}>Next</button
				>
			</div>
		{/if}
		<div class="card-contents">
			<div class="candidate">
				<span class="strong">{candidates[currentIndex].candidateName}</span>{candidates[
					currentIndex
				].district !== 'at-large'
					? 'District ' + candidates[currentIndex].district
					: 'At-large'}
			</div>
			<article>{article}</article>
		</div>
	{/if}
</div>

<style lang="scss">
	.question-card {
		display: flex;
		justify-content: center;
		min-height: 5rem;
	}

	.card-contents {
		display: flex;
		margin: 1rem 3rem;
		@media (max-width: 600px) {
			margin: 1rem 1rem;
		}
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;

		article {
			text-align: left;
			align-self: baseline;
			text-indent: 2rem;
		}
	}

	.clickable-question {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
		font-weight: bold;
		font-size: 1.25rem;
		text-align: left;
		padding: 1rem;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		@media (max-width: 600px) {
			font-size: 1rem;
		}
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		margin: 1rem;
	}

	.hoverable:hover {
		background-color: #1a4d25;
		color: #e6efff;
	}

	.candidate {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}

	.pagination {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 0.5rem;
	}

	.circle {
		border-radius: 50%;
		background-color: #e6efff;
		width: 10px;
		height: 10px;
		@media (max-width: 600px) {
			display: none;
		}
	}

	.active-circle {
		@extend .circle;
		background-color: #1a4d25;
	}

	.strong {
		font-weight: bold;
	}
</style>
