import { TimerActions } from "./actions";

export function timerReducer(currentState, action) {
    switch (action.type) {
        case TimerActions.START:
            return startTimer(currentState);

        case TimerActions.PAUSE:
            return pauseTimer(currentState);

        case TimerActions.RESET:
            return resetTimer();

        case TimerActions.TICK:
            return tickTimer(currentState);

        default:
            return currentState;
    }
}

function startTimer(state) {
    return { ...state, isPaused: false };
}

function pauseTimer(state) {
    return { ...state, isPaused: true };
}

function resetTimer() {
    return { count: 0, isPaused: true };
}

function tickTimer(state) {
    return { ...state, count: state.count + 1 };
}