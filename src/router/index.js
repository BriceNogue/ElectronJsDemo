import { createRouter, createWebHashHistory } from 'vue-router';
import PageOne from '../views/PageOne.vue';
import PageTwo from '../views/PageTwo.vue';

const routes = [
    {
        path: '/',
        name: 'PageOne',
        component: PageOne
    },
    {
        path: '/page-two',
        name: 'PageTwo',
        component: PageTwo
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;