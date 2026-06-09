import { AlarmActions } from "./actions";

export function alarmReducer(currentState, action) {
    switch (action.type) {
        case AlarmActions.SET:
            return setAlarm(currentState, action);

        case AlarmActions.TOGGLE:
            return toggleAlarm(currentState);

        case AlarmActions.RING:
            return ringAlarm(currentState);

        case AlarmActions.STOP:
            return stopAlarm(currentState);

        default:
            return currentState;
    }
}

function setAlarm(state, action) {
    return { ...state, targetAlarmTime: action.payload};
}

function toggleAlarm(state) {
    return { ...state, isAlarmEnabled: !state.isAlarmEnabled };
}

function ringAlarm(state) {
    return { ...state, isRinging: true };
}

function stopAlarm(state) {
    return { ...state, isRinging: false, isAlarmEnabled: false };
}