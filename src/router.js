import { createRouter, createWebHistory } from 'vue-router';

import CoachRegister from './pages/coaches/CoachRegister.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import ContactCoach from './pages/requests/ContactCoach.vue';
import ReceivedRequest from './pages/requests/ReceivedRequest.vue';
import NotFound from './pages/NotFound.vue'

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/',
            redirect : 'coaches'
        },
        {
            path : '/register',
            component : CoachRegister
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
            component : ReceivedRequest
        },
        {
            path : '/:notFound(.*)',
            component : NotFound
        }
    ]
});

export default router;