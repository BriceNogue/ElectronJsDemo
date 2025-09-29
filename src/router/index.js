import { createRouter, createWebHashHistory } from 'vue-router';
import ProductsList from '../views/Products/ProductsList.vue';
import ProductDetails from '../views/Products/ProductDetails.vue';
import Register from '../views/auth/Register.vue';
import Login from '../views/auth/Login.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/articles',
        name: 'Articles',
        component: ProductsList
    },
    {
        path: '/product-details/:id',
        name: 'Details',
        component: ProductDetails
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;