export default {
        userId(state){
            return state.id;
        },
        token(state){
            return state.token;
        },
        isAuth(state){
            return !!state.token;
        },
        autoLogout(state){
            return state.autoLogout;
        }
}