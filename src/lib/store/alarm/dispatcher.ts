import { alarmReducer } from "./reducer";
import { alarmState } from "./state.svelte";

export function dispatch(action){
    const newState = alarmReducer(alarmState, action);

    Object.assign(alarmState, newState);
}