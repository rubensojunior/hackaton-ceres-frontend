import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'

import CarroCRUD from '@/views/carros/CarroCRUD'

import LivroCRUD from '@/views/livros/LivroCRUD'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'carros',
            path: '/carros',
            component: CarroCRUD
        },
        {
            name: 'livros',
            path: '/livros',
            component: LivroCRUD
        }
    ]
})