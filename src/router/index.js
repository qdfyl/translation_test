import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'indexView',
        component: () => import('../views/indexView.vue')
    }]
})
export default router;