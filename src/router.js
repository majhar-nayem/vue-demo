import { createRouter, createWebHistory } from 'vue-router';

import CoachRegister from './pages/coaches/CoachRegister.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import ContactCoach from './pages/requests/ContactCoach.vue';
import ReceivedRequest from './pages/requests/ReceivedRequest.vue';
import NotFound from './pages/NotFound.vue';
import AuthUser from './pages/auth/AuthUser.vue';
import store from './store/index.js';

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/',
            redirect : 'coaches'
        },
        {
            path : '/login',
            component : AuthUser,
            meta: {
                requiresUnAuth : true
            }
        },
        {
            path : '/register',
            component : CoachRegister,
            meta : {
                requiresAuth : true
            }
        },
        {
            path : '/coaches',
            component : CoachList
        },
        {
            path : '/coaches/:id',
            component : CoachDetails,
            props : true,
            children : [
                {
                    path : 'contact',
                    component : ContactCoach
                }
            ]
        },
        {
            path : '/requests',
            component : ReceivedRequest,
            meta : {
                requiresAuth : true
            }
        },
        {
            path : '/:notFound(.*)',
            component : NotFound
        }
    ]
});

router.beforeEach(function(to,_,next){
    if(to.meta.requiresAuth && !store.getters.isAuth){
        next('/login');
    } else if(to.meta.requiresUnAuth && store.getters.isAuth){
        next('/coaches');
    }else{
        next();
    }
});

export default router;