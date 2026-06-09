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

<div class="p-4">
	<h2 class="mb-4 text-2xl font-bold">Alarm</h2>

	<div class="mb-6 flex items-center gap-2">
		<input type="time" bind:value={timeInput} class="rounded border border-black p-2" />
		<button
			class="rounded bg-blue-500 px-4 py-2 font-bold text-white shadow"
			onclick={handleSetAlarm}
		>
			Set Alarm
		</button>
	</div>

	{#if alarmState.isAlarmEnabled}
		<p class="font-medium text-gray-600">
			Alarm is set for: <span class="text-black">{alarmState.targetAlarmTime}</span>
		</p>
	{/if}

	{#if alarmState.isRinging}
		<div class="mt-4 rounded border border-red-500 bg-red-100 p-4">
			<p class="animate-pulse font-bold text-red-700">Alarm is Ringing!</p>
			<button
				class="mt-2 rounded bg-red-500 px-4 py-2 text-white shadow"
				onclick={() => dispatch({ type: AlarmActions.STOP })}
			>
				Stop Alarm
			</button>
		</div>
	{/if}
</div>
