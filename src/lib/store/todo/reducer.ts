import { TodoActions } from "./actions";
import { todoState, } from "./state.svelte";

export const todoReducer = (action, payload) => {

    const targetTask = payload?.id
        ? todoState.tasks.find(task => task.id === payload.id)
        : null;

    switch (action) {
        case TodoActions.ADD:
            todoState.tasks.push({
                id: Date.now(),
                title: payload.title,
                isDone: false,
                timeSpent: 0,
                priority: payload.priority || 0,
                isTracking: false,
                lastSavedTime: Date.now()
            });
            break;

        case TodoActions.DELETE:
            todoState.tasks = todoState.tasks.filter(task => task.id !== payload.id);
            break;

        case TodoActions.RENAME:
            if (targetTask) targetTask.title = payload.title;
            break;

        case TodoActions.PRIORITY:
            if (targetTask) targetTask.priority = payload.priority;
            break;

        case TodoActions.COMPLETED:
            if (targetTask) {
                targetTask.isDone = !targetTask.isDone;

                if (targetTask.isDone && targetTask.isTracking) {
                    targetTask.isTracking = false;

                    if (targetTask.lastSavedTime !== null) {
                        const diff = Math.floor((Date.now() - targetTask.lastSavedTime) / 1000);

                        if (diff > 0) targetTask.timeSpent += diff;
                    }
                    targetTask.lastSavedTime = null;
                }
            }
            break;

        case TodoActions.TOGGLE_TRACKING:
            if (!targetTask || targetTask.isDone) break;

            todoState.tasks.forEach(task => {
                if (task.id === payload.id) {
                    task.isTracking = !task.isTracking;

                    if (task.isTracking) task.lastSavedTime = Date.now();

                } else {
                    task.isTracking = false;
                }
            });
            break;

        case TodoActions.SYNC_TIME:
            const now = Date.now();
            todoState.tasks.forEach(task => {
                if (task.isTracking && task.lastSavedTime) {
                    const diff = Math.floor((now - task.lastSavedTime) / 1000);
                    if (diff > 0) {
                        task.timeSpent += diff;
                        task.lastSavedTime = now;
                    }
                }
            });
            break;

    }
}