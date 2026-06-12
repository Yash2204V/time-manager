<script>
	import { stopwatchState, StopwatchActions } from '$lib/store/stopwatch';
	import { dispatch } from '$lib/store/stopwatch/dispatcher';
	import { formatSecondsToTime } from '$lib/store/stopwatch/mapper';

	$effect(() => {
		if (!stopwatchState.isPaused) {
			const interval = setInterval(() => {
				dispatch({ type: StopwatchActions.TICK });
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	});
</script>

<div class="max-w-2xl mx-auto p-4 sm:p-8 bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
    <div class="mb-6 sm:mb-10 text-center">
        <div class="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30 mb-4 sm:mb-6 transform rotate-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-2">Stopwatch</h1>
        <p class="text-slate-500 font-medium text-sm sm:text-base">Track your time with precision.</p>
    </div>

    <div class="flex flex-col items-center py-4 sm:py-8">
        <div class="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center mb-10 sm:mb-12">
            <!-- decorative circles -->
            <div class="absolute inset-0 rounded-full border-[10px] sm:border-[14px] border-slate-100 shadow-inner"></div>
            <div class="absolute inset-0 rounded-full border-[10px] sm:border-[14px] border-emerald-400 {stopwatchState.isPaused ? 'opacity-20' : 'opacity-100 shadow-[0_0_30px_rgba(52,211,153,0.4)]'} transition-all duration-500 ease-in-out border-t-emerald-300 border-r-emerald-500 border-b-teal-500 border-l-teal-400 animate-[spin_4s_linear_infinite]" style="{stopwatchState.isPaused ? 'animation-play-state: paused;' : ''}"></div>
            
            <div class="relative z-10 bg-white w-44 h-44 sm:w-[15.5rem] sm:h-[15.5rem] rounded-full flex items-center justify-center shadow-lg border border-slate-50">
                <span class="font-mono text-4xl sm:text-6xl font-black text-slate-800 tracking-tighter">
                    {formatSecondsToTime(stopwatchState.count)}
                </span>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-4/5 mx-auto">
            {#if stopwatchState.isPaused && stopwatchState.count === 0}
                <!-- Initial State -->
                <button
                    class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                    onclick={() => dispatch({ type: StopwatchActions.START })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Start
                </button>
            {:else if !stopwatchState.isPaused}
                <!-- Running State -->
                <button
                    class="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                    onclick={() => dispatch({ type: StopwatchActions.PAUSE })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Pause
                </button>
            {:else}
                <!-- Paused State -->
                <button
                    class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                    onclick={() => dispatch({ type: StopwatchActions.START })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Resume
                </button>
            {/if}

            <button
                class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm border border-slate-200 flex items-center justify-center gap-2 {stopwatchState.count === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                onclick={() => dispatch({ type: StopwatchActions.RESET })}
                disabled={stopwatchState.count === 0}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Reset
            </button>
        </div>
    </div>
</div>
