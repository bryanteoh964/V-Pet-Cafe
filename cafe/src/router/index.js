import { createRouter, createWebHistory } from 'vue-router'
import Start from '../components/StartPage.vue'
import Playground from '../components/PlayGround.vue'
import LoginPage from '../components/LoginPage.vue'
import CallBack from '../components/CallBack.vue'
import DatabaseTest from '../components/DatabaseTest.vue'
import SpotTest from '../components/SpotTest.vue'
import Date from '../components/Date.vue'
import Loader from '../components/CatLoader.vue'

const routes = [
    {
        path: '/',
        component: Start
    },
    {
        path: '/main',
        component: Playground
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/callback',
        component: CallBack
    },
    {
        path: '/spottest',
        component: SpotTest
    },
    {
        path: '/dbtest',
        component: DatabaseTest
    },
    {
        path: '/date',
        component: Date
    },
    {
        path: '/loader',
        component: Loader
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router