export interface Task {
    id: number;
    title: string;
    isDone: boolean;
    timeSpent: number;
    priority: number;
    isTracking: boolean;
    lastSavedTime: number | null;
}

export const todoState = $state({
    tasks: [] as Task[]
});
