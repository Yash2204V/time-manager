<script>
	import { AlarmActions, alarmState } from '$lib/store/alarm';
	import { dispatch } from '$lib/store/alarm/dispatcher';
	import alarmMp3 from '$lib/assets/alarm.mp3';
	import { formatRealTime } from '$lib/store/clock/mapper';

	let timeInput = $state('');
	let alarmAudio;

	$effect(() => {
		if (!alarmAudio) {
			alarmAudio = new Audio(alarmMp3);
			alarmAudio.loop = true;
		}

		if (alarmState.isRinging) {
			alarmAudio.play().catch((error) => console.error(error));
		} else {
			alarmAudio.pause();
			alarmAudio.currentTime = 0;
		}
		return () => alarmAudio.pause();
	});

	$effect(() => {
		if (alarmState.isAlarmEnabled && !alarmState.isRinging) {
			const checkInterval = setInterval(() => {
				const timeNow = new Date();
				const hours = timeNow.getHours().toString().padStart(2, '0');
				const minutes = timeNow.getMinutes().toString().padStart(2, '0');
				const currentTimeString = `${hours}:${minutes}`;

				// Agar current time aur set kiya hua time match ho jaye
				if (currentTimeString === alarmState.targetAlarmTime) {
					dispatch({ type: AlarmActions.RING });
				}
			}, 1000);

			// Clean Code: Memory leak se bachne ke liye hamesha interval clean karo
			return () => clearInterval(checkInterval);
		}
	});

	function handleSetAlarm() {
		if (timeInput) {
			dispatch({ type: AlarmActions.SET, payload: timeInput });

			if (!alarmState.isAlarmEnabled) {
				dispatch({ type: AlarmActions.TOGGLE });
			}
		}
	}
</script>

<div class="max-w-xl mx-auto p-4 sm:p-8 bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
    <div class="mb-6 sm:mb-10 text-center">
        <div class="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-500/30 mb-4 sm:mb-6 transform -rotate-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-2">Alarm</h1>
        <p class="text-slate-500 font-medium text-sm sm:text-base">Wake up or remember your important tasks.</p>
    </div>

    <div class="relative group mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <div class="relative flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
            <input 
                type="time" 
                bind:value={timeInput} 
                class="flex-1 bg-transparent px-4 py-3 sm:pl-6 sm:pr-4 sm:py-4 text-2xl sm:text-3xl font-mono text-slate-700 outline-none placeholder-slate-400 text-center sm:text-left" 
            /> 
            <button 
                class="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 sm:py-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md whitespace-nowrap text-sm sm:text-base" 
                onclick={handleSetAlarm}
            >
                Set Alarm
            </button>
        </div>
    </div>

    {#if alarmState.isAlarmEnabled}
        <div class="bg-orange-50/80 border border-orange-100 rounded-2xl p-4 sm:p-6 text-center animate-in fade-in zoom-in-95 duration-300 shadow-sm">
            <p class="text-slate-600 font-medium mb-1 text-sm sm:text-base">Active Alarm</p>
            <p class="text-3xl sm:text-4xl font-bold text-orange-600 font-mono tracking-tight">{alarmState.targetAlarmTime}</p>
        </div>
    {/if}

    {#if alarmState.isRinging}
        <div class="mt-6 sm:mt-8 rounded-3xl border-2 border-red-500 bg-red-50 p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(239,68,68,0.4)] animate-pulse relative overflow-hidden">
            <div class="absolute inset-0 bg-red-400/20 blur-xl"></div>
            <svg xmlns="http://www.w3.org/2000/svg" class="relative z-10 h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-3 sm:mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p class="relative z-10 text-xl sm:text-2xl font-black text-red-600 uppercase tracking-widest mb-4 sm:mb-6">Alarm is Ringing!</p>
            <button
                class="relative z-10 bg-red-500 hover:bg-red-600 px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-white font-bold tracking-wider shadow-lg transform hover:scale-105 transition-all active:scale-95 text-base sm:text-lg w-full sm:w-auto"
                onclick={() => dispatch({ type: AlarmActions.STOP })}
            >
                Stop Alarm
            </button>
        </div>
    {/if}
</div>
