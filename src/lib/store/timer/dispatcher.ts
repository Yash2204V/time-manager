import { timerReducer } from "./reducer";
import { timerState } from "./state.svelte";


export function dispatch(action) {
    const newState = timerReducer(timerState, action);

    Object.assign(timerState, newState);
}
