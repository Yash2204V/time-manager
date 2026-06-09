<script>
	import alarmFile from '$lib/assets/alarm.mp3';

	let currentTime = $state(new Date());
	let alarmTime = $state('');
	let isAlarmSet = $state(false);
	let isTriggered = $state(false);

	let alarmSound;

	$effect(() => {
		alarmSound = new Audio(alarmFile);
		alarmSound.loop = true;

		const interval = setInterval(() => {
			currentTime = new Date();
			checkAlarm();
		}, 1000);

		return () => {
			clearInterval(interval);
			if (alarmSound) alarmSound.pause();
		};
	});

	function formatTime(date) {
		const hh = String(date.getHours()).padStart(2, '0');
		const mm = String(date.getMinutes()).padStart(2, '0');
		return `${hh}:${mm}`;
	}

	function checkAlarm() {
		if (!isAlarmSet || !alarmTime || !alarmSound) return;

		if (formatTime(currentTime) === alarmTime) {
			isTriggered = true;
			isAlarmSet = false;
			alarmSound.play().catch(err => {
				console.log("Audio playback blocked. Interact with the page first.", err);
			});
		}
	}

	function setAlarm() {
		if (alarmTime) {
			isAlarmSet = true;
			isTriggered = false;
		}
	}

	function clearAlarm() {
		isAlarmSet = false;
		isTriggered = false;
		alarmTime = '';
		if (alarmSound) {
			alarmSound.pause();
			alarmSound.currentTime = 0;
		}
	}

	function dismissAlarm() {
		isTriggered = false;
		if (alarmSound) {
			alarmSound.pause();
			alarmSound.currentTime = 0;
		}
	}
</script>

<div class="alarm-clock">

	{#if !isAlarmSet && !isTriggered}
		<div class="control-group">
			<input type="time" bind:value={alarmTime} />
			<button onclick={setAlarm}>Set Alarm</button>
		</div>
	{:else if isAlarmSet}
		<p>Alarm set for: {alarmTime}</p>
		<button onclick={clearAlarm}>Cancel</button>
	{/if}

	{#if isTriggered}
		<div class="alarm-modal">
			<h2>⏰ WAKE UP! ⏰</h2>
			<button onclick={dismissAlarm}>Dismiss</button>
		</div>
	{/if}
</div>

<style>
	.alarm-clock {
		text-align: center;
		font-family: sans-serif;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		max-width: 300px;
		margin: auto;
	}
	.alarm-modal {
		margin-top: 1rem;
		background: #ffcccc;
		padding: 1rem;
		border-radius: 4px;
		animation: flash 1s infinite alternate;
	}
	@keyframes flash {
		from { background: #ffcccc; }
		to { background: #ff6666; }
	}
	.alarm-modal h2 { margin: 0 0 1rem 0; color: #cc0000; }
	button { padding: 8px 16px; cursor: pointer; }
</style>
