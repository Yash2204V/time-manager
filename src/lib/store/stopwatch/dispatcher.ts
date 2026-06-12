import { stopwatchReducer } from "./reducer";
import { stopwatchState } from "./state.svelte";


export function dispatch(action) {
    const newState = stopwatchReducer(stopwatchState, action);

    Object.assign(stopwatchState, newState);
}
