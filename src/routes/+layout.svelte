<script lang="ts">
	import './layout.css';
	import logo from '$lib/assets/logo.png';
	import { formatRealTime } from '$lib/store/clock/mapper';

	let currentTime = $state(new Date());
	let { children } = $props();

	$effect(() => {
		const interval = setInterval(() => {
			currentTime = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<div class="flex w-full flex-col items-center">
	<div class="w-full p-2 sm:w-1/2">
		<nav class="flex items-center justify-between text-xl font-semibold">
			<div class="flex items-center gap-3">
				<img src={logo} width="50" alt="" srcset="" />
				<a class="text-black hover:text-blue-950 hover:underline" href="/">Home</a>
				<a class="text-black hover:text-blue-950 hover:underline" href="/timer">Timer</a>
			</div>

			<div>{formatRealTime(currentTime)}</div>
		</nav>

		<div class="my-4 h-0.5 w-full bg-black"></div>

		{@render children()}
	</div>
</div>
