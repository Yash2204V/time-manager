<script>
	import { timerState, TimerActions } from '$lib/store/timer';
	import { dispatch } from '$lib/store/timer/dispatcher';
	import { formatSecondsToTime } from '$lib/store/timer/mapper';

	$effect(() => {
		if (!timerState.isPaused) {
			const interval = setInterval(() => {
				dispatch({ type: TimerActions.TICK });
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	});
</script>

<div class="">
	<div class="flex gap-2 justify-center">
		<button
			class="rounded-xs bg-green-400 px-4 py-1 font-mono text-2xl text-black hover:bg-green-300"
			onclick={() => dispatch({ type: TimerActions.START })}>Start</button
		>
		<button
			class="rounded-xs bg-blue-400 px-4 py-1 font-mono text-2xl text-black hover:bg-blue-300"
			onclick={() => dispatch({ type: TimerActions.RESET })}>Reset</button
		>
		<button
			class="rounded-xs bg-red-400 px-4 py-1 font-mono text-2xl text-black hover:bg-red-300"
			onclick={() => dispatch({ type: TimerActions.PAUSE })}>Pause</button
		>
	</div>
	<div class="flex w-full items-center text-5xl justify-center h-[50vh]">
		{formatSecondsToTime(timerState.count)}
	</div>
</div>
