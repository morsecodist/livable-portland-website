<script>
	import { onMount } from 'svelte';
	import QuestionAndAnswer from '../../components/QuestionAndAnswer.svelte';
	// Your qAndA data
	let questions = [];
	let answers = [];
	let groupedQuestions = [];
	let candidates = [];
	let filteredCandidates = [];
	let filteredAnswers = [];
	let activeCandidateId;

	async function fetchData(location) {
		const response = await fetch(location);
		const data = await response.json();
		return data;
	}

	onMount(async () => {
		questions = await fetchData('../../static/election/2024_questions.json');
		answers = await fetchData('../../static/election/2024_answers.json');
		candidates = await fetchData('../../static/election/2024_candidates.json');
		updateFilteredCandidatesAndAnswers();
	});

	const districts = [
		{
			districtId: '1',
			districtName: 'District 1',
			active: false
		},
		{
			districtId: '2',
			districtName: 'District 2',
			active: false
		},
		{
			districtId: 'at-large',
			districtName: 'At-large',
			active: false
		}
	];

	function toggleDistrict(index) {
		districts[index].active = !districts[index].active;
		if (!districts.some((district) => !district.active)) {
			districts.forEach((district) => (district.active = false));
		}
		updateFilteredCandidatesAndAnswers();
	}

	function toggleCandidate(index) {
		if (districts.some((district) => district.active)) {
			if (activeCandidateId === filteredCandidates[index].candidateId) {
				activeCandidateId = null;
			} else {
				activeCandidateId = filteredCandidates[index].candidateId;
			}
		} else {
			if (activeCandidateId === candidates[index].candidateId) {
				activeCandidateId = null;
			} else {
				activeCandidateId = candidates[index].candidateId;
			}
		}

		updateFilteredCandidatesAndAnswers();
	}

	function updateFilteredCandidatesAndAnswers() {
		console.log('activeCandidateId', activeCandidateId);
		filteredCandidates = candidates.filter((candidate) => {
			if (districts.every((district) => !district.active)) {
				return true; // If no district is active, show all candidates
			}
			return districts.some(
				(district) => district.active && candidate.district === district.districtId
			);
		});
		filteredAnswers = answers.filter((answer) => {
			if (districts.every((district) => !district.active)) {
				return true; // If no district is active, show all candidates
			}
			return filteredCandidates.some((candidate) => candidate.candidateId === answer.candidateId);
		});
		groupedQuestions = questions.reduce((acc, question) => {
			const category = question.category || 'Uncategorized';
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(question);
			return acc;
		}, {});
	}
</script>

<div class="container">
	<h1>What the candidates say</h1>
	<article>
		<p>
			The Urbanist Coalition of Portland is an advocacy group with the goal of making Portland more
			livable for everyone. We support middle density, mixed-use neighborhoods with access to
			transit and cycling infrastructure, which will provide affordable housing, protect our
			environment, and make our city a more pleasant and safe place to live and work. Our policies
			and approach are strongly inspired by the YIMBY movement, Strong Towns, and more.
		</p>
		<p>
			We wanted to hear from city council candidates about whether they support our main policy
			priorities, how they plan to accomplish those goals on the council, and what new ideas they’re
			bringing to the table. We asked a lot of questions, and the candidates had a lot to say. You
			can find the complete responses of each candidate below, filterable by candidate or council race.
		</p>
		<p>
			You can read our condensed summary of the responses given by At-Large and D2 candidates and a
			table of how UCP graded their responses in the October 2024 issue of the West End News (link
			when available, ~October 3rd). Our organization’s founder and president, Robert Todd Morse, is
			a candidate in the D1 council race. The responses of both D1 candidates are presented on the
			UCP website only, without grading or commentary.
		</p>
	</article>
	<div class="filter-items">
		{#each districts as district, index}
			<button
				on:click={() => toggleDistrict(index)}
				class={district.active ? 'active-filter-item' : 'filter-item'}
			>
				{district.districtName}
			</button>
		{/each}
	</div>
	<div class="fading-line-small" />
	<div class="filter-items">
		{#each filteredCandidates as candidate, index}
			<button
				on:click={() => toggleCandidate(index)}
				class={activeCandidateId && activeCandidateId === candidate.candidateId
					? 'active-filter-item'
					: 'filter-item'}
			>
				{candidate.candidateName}
			</button>
		{/each}
	</div>
	{#each Object.keys(groupedQuestions) as category}
		<h2>{category}</h2>
		<div class="fading-line" />
		{#each groupedQuestions[category] as question}
			<QuestionAndAnswer {question} {answers} candidates={filteredCandidates} {activeCandidateId} />
		{/each}
	{/each}
</div>

<style lang="scss">
	article {
		text-align: left;
		text-indent: 2rem;
	}

	.container {
		display: flex;
		width: auto;
		flex-direction: column;
		gap: 1rem;
	}

	.filter-items {
		display: flex;
		justify-content: center;
		align-self: center;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: row;
		@media (max-width: 600px) {
			flex-direction: column;
		}
		gap: 1rem;
	}

	.filter-item {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
	}

	.active-filter-item {
		@extend .filter-item;
		font-weight: bold;
		color: var(--bs-primary);
	}

	.fading-line {
		width: 100%;
		height: 2px;
		background: radial-gradient(circle, rgba(26, 77, 37, 0.5), transparent);
		border-radius: 50%;
		align-self: center;
	}

	.fading-line-small {
		@extend .fading-line;
		width: 50%;
		height: 1px;
	}
</style>
