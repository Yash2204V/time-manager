<script>
    import { TimeState } from "$lib/state/time.svelte";
    import {formatTime} from "$lib/utils/time"

    let alarm = new TimeState();

    let handleTimerStart = () => alarm.startTimer();

    let handleTimerStop = () => alarm.stopTimer();

    let handleTimerReset = () => alarm.resetTimer();

</script>

<div>

    <div class="flex gap-2">
        <button class="text-xs border border-black rounded-md bg-green-400 hover:bg-green-300 text-black px-1" onclick={handleTimerStart}>Start</button>
        <button class="text-xs border border-black rounded-md bg-blue-400 hover:bg-blue-300 text-black px-1" onclick={handleTimerReset}>Reset</button>
        <button class="text-xs border border-black rounded-md bg-red-400 hover:bg-red-300 text-black px-1" onclick={handleTimerStop}>Stop</button>
    </div>
    
    {formatTime(alarm.count)}

</div>

