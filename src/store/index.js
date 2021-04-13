import { createStore } from 'vuex';

import CoacheModuel from './modules/coaches/index.js'
import RequestModule from './modules/coaches/index.js'

const store = createStore({
    modules : {
        coaches : CoacheModuel,
        requests : RequestModule
    },
    state(){
        return {
            id : 'c3'
        }
    },
    getters : {
        id(state){
            return state.id;
        }
    }
});

export default store;