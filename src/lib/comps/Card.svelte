<script>
    import { todoReducer } from '$lib/store/todo/reducer.js';
	import { TodoActions } from "$lib/store/todo/actions";
	import { formatSecondsToTime } from '$lib/store/stopwatch/mapper';
    
    let { task, isMenuOpen, onToggleMenu } = $props();
    let isEditing = $state(false);
    let editTitle = $state('');
    let editPriority = $state(0);

    function getPriorityDetails(p) {
        switch(p) {
            case 3: return { color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', label: 'Urgent' };
            case 2: return { color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', label: 'High' };
            case 1: return { color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Medium' };
            default: return { color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200', label: 'Low' };
        }
    }
    let pDetails = $derived(getPriorityDetails(task.priority));

    function handleSave() {
        if (editTitle.trim()) {
            todoReducer(TodoActions.RENAME, { id: task.id, title: editTitle });
            if (editPriority !== task.priority) {
                todoReducer(TodoActions.PRIORITY, { id: task.id, priority: editPriority });
            }
        }
        isEditing = false;
    }

    function startEditing() {
        editTitle = task.title;
        editPriority = task.priority || 0;
        isEditing = true;
    }

    function handleDelete() {
        todoReducer(TodoActions.DELETE, { id: task.id });
    }

    function toggleTracking() {
        todoReducer(TodoActions.TOGGLE_TRACKING, { id: task.id });
    }

    function toggleCompletion() {
        todoReducer(TodoActions.COMPLETED, { id: task.id });
    }
    let editPriorityMenuOpen = $state(false);
    let editPDetails = $derived(getPriorityDetails(editPriority));

    function focusNode(node) {
        node.focus();
    }
</script>

<div class="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 {task.isDone ? 'opacity-75 bg-slate-50' : ''}">
    {#if task.isTracking}
        <div class="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 animate-pulse"></div>
    {/if}

    {#if isEditing}
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input 
                class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700" 
                bind:value={editTitle} 
                onkeydown={(e) => e.key === 'Enter' && handleSave()}
                use:focusNode
            /> 
            <div class="relative flex-shrink-0">
                <button 
                    class="p-2.5 rounded-xl transition-colors duration-200 bg-white border border-slate-200 hover:bg-slate-50 {editPDetails.color}"
                    onclick={() => editPriorityMenuOpen = !editPriorityMenuOpen}
                    title="Change Priority"
                    aria-label="Change priority"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                    </svg>
                </button>
                
                {#if editPriorityMenuOpen}
                    <div class="absolute right-0 sm:left-0 sm:right-auto mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div class="py-1">
                            {#each [3, 2, 1, 0] as p}
                                <button 
                                    class="w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 flex items-center gap-3 transition-colors {getPriorityDetails(p).color} {editPriority === p ? 'bg-slate-50' : ''}"
                                    onclick={() => { editPriority = p; editPriorityMenuOpen = false; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                                    </svg>
                                    {getPriorityDetails(p).label}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
            <button 
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm whitespace-nowrap" 
                onclick={handleSave}
            >
                Save
            </button>
        </div>
    {:else}
        <div class="flex items-start sm:items-center justify-between gap-2">
            <div class="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <!-- Checkbox -->
                <button 
                    class="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 {task.isDone ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300 hover:border-indigo-400 bg-white'}"
                    onclick={toggleCompletion}
                >
                    {#if task.isDone}
                        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    {/if}
                </button>
                
                <div class="flex flex-col items-start min-w-0 flex-1">
                    <div class="flex items-center gap-2 flex-wrap max-w-full">
                        <span class="text-base sm:text-lg font-medium truncate max-w-[200px] sm:max-w-md transition-colors duration-200 {task.isDone ? 'text-slate-400 line-through' : 'text-slate-800'}">
                            {task.title}
                        </span>
                        <span class="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold rounded-md border uppercase tracking-wider {pDetails.bg} {pDetails.color} {pDetails.border} whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                            </svg>
                            {pDetails.label}
                        </span>
                    </div>
                    <span class="text-[10px] sm:text-xs font-semibold mt-0.5 {task.isTracking ? 'text-indigo-600' : 'text-slate-500'}">
                        {formatSecondsToTime(task.timeSpent)} {task.isTracking ? '· Tracking...' : ''}
                    </span>
                </div>
            </div>

            <div class="flex items-center gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 mt-1 sm:mt-0" style="{isMenuOpen || task.isTracking ? 'opacity: 1;' : ''}">
                <button 
                    onclick={toggleTracking} 
                    disabled={task.isDone}
                    class="p-2 rounded-xl transition-all duration-200 {task.isTracking ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'} {task.isDone ? 'opacity-50 cursor-not-allowed' : ''}"
                    title={task.isTracking ? "Stop tracking" : "Start tracking"}
                >
                    {#if task.isTracking}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>
                    {/if}
                </button>

                <button 
                    onclick={onToggleMenu}
                    class="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-xl transition-all duration-200 {isMenuOpen ? 'bg-slate-100 text-slate-700' : ''}"
                    aria-label="Task options"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                </button>
            </div>
        </div>

        {#if isMenuOpen}
            <div class="mt-4 pt-4 border-t border-slate-100 flex gap-4 text-sm font-medium">
                <button class="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors" onclick={() => {isEditing = true; onToggleMenu();}}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit
                </button>
                <button class="flex items-center gap-1.5 text-slate-500 hover:text-red-600 transition-colors" onclick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                </button>
            </div>
        {/if}
    {/if}
</div>