<script lang="ts">
	import MailingList from '../components/MailingList.svelte';
</script>

<svelte:head>
	<title>UCP - Get Involved</title>
</svelte:head>

<h1 class="text-primary">Get Involved</h1>

<div class="text-start">
	<p>
		We are always looking for new people to get involved, no matter how small your involvement may
		be or what your skills are. If you want to:
	</p>
	<ul>
		<li>Help plan and provide feedback</li>
		<li>Help with data analysis, or learn more about analyzing public datasets</li>
		<li>Help manage our organization</li>
		<li>Help communicate our message</li>
		<li>Hear updates and our perspective on city issues</li>
	</ul>
</div>

<p>
	Please add your name and email if you want to get updates. We send about one email a month and you
	can unsubscribe at any time. If you want to keep up with us more often you can see updates on our <a
		href="https://www.instagram.com/urbanistportland.me/"
		target="_blank"
		rel="noreferrer">Instagram</a
	>
	and <a href="https://discord.gg/EBF8EUN2RK" target="_blank" rel="noreferrer">Discord</a>.
</p>

<MailingList listName="ucp-general" />
