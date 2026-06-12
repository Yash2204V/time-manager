<script>
    import { todoState } from "$lib/store/todo/state.svelte.js";
    import { todoReducer } from "$lib/store/todo/reducer.js";
	import { TodoActions } from "$lib/store/todo/actions";
    import Card from "$lib/comps/Card.svelte";
    
    let tasks = $derived(todoState.tasks);
    let title = $state('');
    let selectedPriority = $state(0);
    let isPriorityMenuOpen = $state(false);
    
    let openMenuId = $state(null); 

    function getPriorityDetails(p) {
        switch(p) {
            case 3: return { color: 'text-red-500', label: 'Urgent Priority' };
            case 2: return { color: 'text-orange-500', label: 'High Priority' };
            case 1: return { color: 'text-blue-500', label: 'Medium Priority' };
            default: return { color: 'text-slate-400', label: 'Low Priority' };
        }
    }

    let pDetails = $derived(getPriorityDetails(selectedPriority));

    function handleAddTask() {
        if (!title.trim()) return;
        todoReducer(TodoActions.ADD, { title, priority: selectedPriority });
        title = '';
        selectedPriority = 0;
    }

    const toggleMenu = (id) => {
        openMenuId = openMenuId === id ? null : id;
    };
</script>

<div class="max-w-2xl mx-auto p-4 sm:p-8 bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
    <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Tasks</h1>
        <p class="text-slate-500 font-medium text-sm sm:text-base">Manage your tasks and track time efficiently.</p>
    </div>

    <div class="relative group mb-8">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <div class="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl p-2 shadow-sm border border-slate-100 gap-2 sm:gap-0">
            <input 
                class="w-full bg-transparent pl-3 sm:pl-4 pr-2 py-2 sm:py-3 text-slate-700 outline-none placeholder-slate-400 font-medium text-base sm:text-lg" 
                bind:value={title} 
                onkeydown={(e) => e.key === 'Enter' && handleAddTask()}
                placeholder="What needs to be done?"
            /> 
            
            <div class="flex items-center justify-between sm:justify-end border-t sm:border-t-0 border-slate-100 pt-2 sm:pt-0">
                <div class="relative mr-2 shrink-0">
                    <button 
                        class="p-2.5 sm:p-2 rounded-xl transition-colors duration-200 hover:bg-slate-100 {pDetails.color} flex items-center gap-2"
                        onclick={() => isPriorityMenuOpen = !isPriorityMenuOpen}
                        title="Set Priority"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                        </svg>
                        <span class="sm:hidden text-sm font-semibold">{pDetails.label}</span>
                    </button>
                    
                    {#if isPriorityMenuOpen}
                        <div class="absolute left-0 sm:left-auto sm:right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div class="py-1">
                                {#each [3, 2, 1, 0] as p}
                                    <button 
                                        class="w-full text-left px-4 py-3 sm:py-2.5 text-sm font-medium hover:bg-slate-50 flex items-center gap-3 transition-colors {getPriorityDetails(p).color} {selectedPriority === p ? 'bg-slate-50' : ''}"
                                        onclick={() => { selectedPriority = p; isPriorityMenuOpen = false; }}
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
                    class="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md shrink-0" 
                    onclick={handleAddTask}
                    aria-label="Add Task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    
    <div class="space-y-3">
        {#each tasks as task (task.id)}
            <div class="transition-all duration-300">
                <Card 
                    {task} 
                    isMenuOpen={openMenuId === task.id} 
                    onToggleMenu={() => toggleMenu(task.id)} 
                />
            </div>
        {/each}
        
        {#if tasks.length === 0}
            <div class="text-center py-12">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
                    <svg class="w-8 h-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                </div>
                <p class="text-slate-500 font-medium">No tasks yet. Add one above to get started!</p>
            </div>
        {/if}
    </div>
</div>