export default {
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    },
    shouldFetch(state){
        const lastFetch = state.lastFetch;
        if(!lastFetch){
            return true;
        }
        const currentTime = new Date().getTime();

        return (currentTime - lastFetch) / 1000 > 60;
    }
}