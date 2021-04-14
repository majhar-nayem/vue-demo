export default {
    addRequest(state, data){
        state.requests.push(data);
    },
    setRequest(state, resData){
        state.requests = resData
    }
}