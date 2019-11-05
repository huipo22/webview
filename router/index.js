import Vue from 'vue'
import Router from 'vue-router'
import Home from '../src/components/home'
import Study from '../src/components/study'
import Love from '../src/components/love'
import Person from '../src/components/person'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/study',
            name: 'Study',
            component: Study
        },
        {
            path: '/love',
            name: 'Love',
            component: Love
        },
        {
            path: '/person',
            name: 'Person',
            component: Person
        },
    ]
})