import { Storage } from "$lib/utils/storageBoundary"
import { TodoActions } from "./actions";
import { todoReducer } from "./reducer";
import { todoState } from "./state.svelte";

export function initTodoSystem() {
    $effect.root(() => {
        const savedTodos = Storage.load('app_todo_state', null);
        if (savedTodos) {
            todoState.tasks = savedTodos.tasks;
            todoReducer(TodoActions.SYNC_TIME);
        }

        $effect(() => {
            const isAnyTaskTracking = todoState.tasks.some(task => task.isTracking);
            let interval: ReturnType<typeof setInterval> | undefined;

            if (isAnyTaskTracking) {
                interval = setInterval(() => {
                    todoReducer(TodoActions.SYNC_TIME);
                }, 1000);
            }
            return () => clearInterval(interval);
        });

        $effect(() => {
            Storage.save('app_todo_state', todoState);
        });
    })
}