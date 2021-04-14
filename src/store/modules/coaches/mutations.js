export default {
    addData(state, payload){
        state.coaches.push(payload);
    },
    setData(state, payload){
        state.coaches = payload;
    }
}