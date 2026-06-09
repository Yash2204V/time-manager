import { SvelteDate } from "svelte/reactivity";

export class TimeState {

    date = new SvelteDate();
    count = $state(0);
    timerRef = $state();
    isPaused = $state(false);

    formatter = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });
    

    start() {
        $effect(() => {
            const interval = setInterval(() => {
                this.date.setTime(Date.now());
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        })
    }

    startTimer() {
        this.isPaused = false;

        if (!this.timerRef) {
            this.timerRef = setInterval(() => {

                if (!this.isPaused) {
                    this.count += 1;
                }

            }, 1000)
        }
    }

    resetTimer() {
        if (this.timerRef) {
            clearInterval(this.timerRef);
            this.timerRef = null;
        }

        this.count = 0;
        this.isPaused = false;
    }

    stopTimer() {
        this.isPaused = true;
    }

    
}