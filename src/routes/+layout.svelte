<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { TimeState } from '$lib/state/time.svelte'

    let alarm = new TimeState();
    alarm.start();

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full flex items-center flex-col">
	<div class="p-2 w-full sm:w-1/2">
		<nav class="flex text-xs font-semibold justify-between">
			<div class="gap-3 flex">
				<a class="underline hover:text-blue-600 text-blue-400" href="/">Home</a>
				<a class="underline hover:text-blue-600 text-blue-400" href="/timer">Timer</a>
			</div>

			<div>{alarm.formatter.format(alarm.date)}</div>
		</nav>

		<div class="w-full h-0.5 bg-black my-2"></div>

		{@render children()}

	</div>
</div>
