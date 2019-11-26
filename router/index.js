import Vue from 'vue'
import Router from 'vue-router'
import Home from '../src/components/home'
import Study from '../src/components/study'
import Love from '../src/components/love'
import Person from '../src/components/person'
import studyDetail from '../src/components/study/studyDetail'
import my from '../src/components/study/my'
import itemDetail from '../src/components/item/itemDetail'
import questionAll from '../src/components/my/questionAll'
import myQuestion from '../src/components/my/myQuestion'
import askQuestion from '../src/components/my/askQuestion'
import questionDetail from '../src/components/my/questionDetail'
import shop from '../src/components/love/shop'
import zhaoshang from '../src/components/love/zhaoshang'
import shopDetail from '../src/components/love/shopDetail'
import itemList from '../src/components/item/itemList'
import baseInfo from '../src/components/my/baseInfo'
import login from '../src/components/login'
import moreCategory from '../src/components/item/moreCategory'
import myAsk from '../src/components/my/myAsk'
import order from '../src/components/my/Order'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        // {
        //     path: '/',
        //     name: 'login',
        //     component: login
        // },
        {
            path: '/home',
            name: 'home',
            component: Home,
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
        {
            path: '/itemList',
            name: 'itemList',
            component: itemList
        },
        {
            path: '/baseInfo',
            name: 'baseInfo',
            component: baseInfo
        },
        {
            path: '/moreCategory',
            name: 'moreCategory',
            component: moreCategory
        },
        {
            path: '/myAsk',
            name: 'myAsk',
            component: myAsk
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
    ]
})