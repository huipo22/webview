import Vue from 'vue'
import Router from 'vue-router'
import Home from '../src/components/home'
import Study from '../src/components/study'
import Love from '../src/components/love'
import Person from '../src/components/person'
import studyDetail from '../src/components/studyDetail'
import my from '../src/components/my'
import itemDetail from '../src/components/itemDetail'
import questionAll from '../src/components/questionAll'
import myQuestion from '../src/components/myQuestion'
import askQuestion from '../src/components/askQuestion'
import questionDetail from '../src/components/questionDetail'
import shop from '../src/components/love/shop'
import zhaoshang from '../src/components/love/zhaoshang'
import shopDetail from '../src/components/love/shopDetail'

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
        {
            path: '/studyDetail',
            name: 'studyDetail',
            component: studyDetail
        },
        {
            path: '/my',
            name: 'my',
            component: my
        },
        {
            path: '/itemDetail',
            name: 'itemDetail',
            component: itemDetail
        },
        {
            path: '/questionAll',
            name: 'questionAll',
            component: questionAll
        },
        {
            path: '/myQuestion',
            name: 'myQuestion',
            component: myQuestion
        },
        {
            path: '/askQuestion',
            name: 'askQuestion',
            component: askQuestion
        },
        {
            path: '/questionDetail',
            name: 'questionDetail',
            component: questionDetail
        },
        {
            path: '/love/shop',
            name: 'shop',
            component: shop
        },
        {
            path: '/love/zhaoshang',
            name: 'zhaoshang',
            component: zhaoshang
        },
        {
            path: '/love/shopDetail',
            name: 'shopDetail',
            component: shopDetail
        },
    ]
})