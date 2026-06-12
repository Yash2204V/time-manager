import { StopwatchActions } from "./actions";

export function stopwatchReducer(currentState, action) {
    switch (action.type) {
        case StopwatchActions.START:
            return startStopwatch(currentState);

        case StopwatchActions.PAUSE:
            return pauseStopwatch(currentState);

        case StopwatchActions.RESET:
            return resetStopwatch();

        case StopwatchActions.TICK:
            return tickStopwatch(currentState);

        default:
            return currentState;
    }
}

function startStopwatch(state) {
    return { ...state, isPaused: false };
}

function pauseStopwatch(state) {
    return { ...state, isPaused: true };
}

function resetStopwatch() {
    return { count: 0, isPaused: true };
}

function tickStopwatch(state) {
    return { ...state, count: state.count + 1 };
}