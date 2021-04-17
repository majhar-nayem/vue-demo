import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

export default {
    state(){
        return {
            id : null,
            token : null,
            expiresIn : null
        }
    },
    actions,
    mutations,
    getters
}