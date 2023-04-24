import { createRouter, createWebHistory } from 'vue-router'
import Start from '../components/StartPage.vue'
import Playground from '../components/PlayGround.vue'
import LoginPage from '../components/LoginPage.vue'
import CallBack from '../components/CallBack.vue'
import DatabaseTest from '../components/DatabaseTest.vue'
import SpotTest from '../components/SpotTest.vue'

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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router