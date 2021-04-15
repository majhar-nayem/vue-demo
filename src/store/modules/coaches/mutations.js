export default {
    addData(state, payload){
        state.coaches.push(payload);
    },
    setData(state, payload){
        state.coaches = payload;
    },
    setLastFetchTimeStamp(state){
        state.lastFetch = new Date().getTime();
    }
}