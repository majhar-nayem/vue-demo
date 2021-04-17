import { createStore } from 'vuex';

import CoacheModuel from './modules/coaches/index.js';
import RequestModule from './modules/requests/index.js';
import authModule from './modules/auth/index';

const store = createStore({
    modules : {
        coaches : CoacheModuel,
        requests : RequestModule,
        auth : authModule
    }
});

export default store;