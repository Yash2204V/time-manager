<script lang="ts">
	import './layout.css';
	import logo from '$lib/assets/logo.png';
	import { formatRealTime } from '$lib/store/clock/mapper';
	import { Storage } from '$lib/utils/storageBoundary';
	import { stopwatchState } from '$lib/store/stopwatch';
	import { alarmState } from '$lib/store/alarm';
	import { initTodoSystem } from '$lib/store/todo/system.svelte';

	let currentTime = $state(new Date());
	let isMobileMenuOpen = $state(false);
	let { children } = $props();

	initTodoSystem();

	$effect(() => {
		const savedStopwatch = Storage.load('app_stopwatch_state', null);
		const savedAlarm = Storage.load('app_alarm_state', null);

		if (savedStopwatch) Object.assign(stopwatchState, savedStopwatch);

		if (savedAlarm) Object.assign(alarmState, savedAlarm);
	});

	$effect(() => {
		Storage.save('app_stopwatch_state', stopwatchState);
	});

	$effect(() => {
		Storage.save('app_alarm_state', alarmState);
	});

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

<div
	class="flex min-h-screen flex-col items-center overflow-x-hidden bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900"
>
	<header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-lg">
		<div class="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
			<div class="flex items-center gap-3 sm:gap-6">
				<button
					class="-ml-2 rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 sm:hidden"
					onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					aria-label="Toggle Menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						{#if isMobileMenuOpen}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						{/if}
					</svg>
				</button>

				<a href="/" class="group flex items-center gap-2 sm:gap-3">
					<div
						class="rounded-xl bg-indigo-50 p-2 transition-colors duration-300 group-hover:bg-indigo-100"
					>
						<img src={logo} class="h-7 w-7 object-contain sm:h-8 sm:w-8" alt="Logo" />
					</div>
					<span class="text-lg font-bold tracking-tight text-slate-800 sm:text-xl"
						>Time<span class="text-indigo-600">App</span></span
					>
				</a>

				<nav class="hidden items-center gap-1 rounded-xl bg-slate-100/70 p-1 sm:flex">
					<a
						class="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
						href="/">Home</a
					>
					<a
						class="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
						href="/stopwatch">Stopwatch</a
					>
					<a
						class="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
						href="/todo">Todo</a
					>
				</nav>
			</div>

			<div
				class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm sm:gap-3 sm:px-4 sm:py-2.5"
			>
				<svg class="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span class="font-mono text-sm font-semibold tracking-tight text-slate-700 sm:text-base"
					>{formatRealTime(currentTime)}</span
				>
			</div>
		</div>

		{#if isMobileMenuOpen}
			<div
				class="animate-in slide-in-from-top-2 absolute left-0 w-full space-y-2 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-xl duration-200 sm:hidden"
			>
				<a
					onclick={() => (isMobileMenuOpen = false)}
					class="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
					href="/">Home (Alarm)</a
				>
				<a
					onclick={() => (isMobileMenuOpen = false)}
					class="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
					href="/stopwatch">Stopwatch</a
				>
				<a
					onclick={() => (isMobileMenuOpen = false)}
					class="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
					href="/todo">Todo List</a
				>
			</div>
		{/if}
	</header>

	<main class="w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
		{@render children()}
	</main>
</div>
