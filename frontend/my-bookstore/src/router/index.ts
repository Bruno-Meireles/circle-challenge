import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home/Home.vue';
import BookDetails from '../pages/bookdDetails/BookDetails.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/book/:id', component: BookDetails },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
