import { createStore } from 'vuex';

import CoacheModuel from './modules/coaches/index.js'
import RequestModule from './modules/coaches/index.js'

const store = createStore({
    modules : {
        coaches : CoacheModuel,
        requests : RequestModule
    }
});

export default store;