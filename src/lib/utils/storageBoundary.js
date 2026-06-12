export const Storage = {
    save: (key, data) => {
        if(typeof window !== 'undefined'){
            try{
                localStorage.setItem(key, JSON.stringify(data)); 
            } catch(error){
                console.error("Storage save error: ", error);
            }
        }
    },
    load: (key, defaultData) => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem(key);
                if (stored) {
                    return JSON.parse(stored);
                }
            } catch (e) {
                console.error("Storage load error:", e);
            }
        }
        return defaultData;
    }
}