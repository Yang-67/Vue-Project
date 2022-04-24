import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Sign from '../components/sign.vue'
import Main1 from '../components/main1.vue'
import Role from '../components/role.vue'
import Shoppinglist from '../components/shoppinglist.vue'
import Manage from '../components/Manage.vue'
import OrderList from '../components/orderList.vue'
import PowerList from '../components/powerList.vue'
import ShopSort from '../components/shopSort.vue'
import SortParam from '../components/sortParam.vue'
import Visualization from '../components/visualization.vue'

Vue.use(VueRouter)

const Router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },
    {
      path:'/Manage',
      name:'Manage',
      component:Manage,
      children: [
        { path: '/main1', component: Main1 },
        { path: '/role', component: Role },
        { path: '/shoppinglist', component: Shoppinglist },
        { path: '/orderList', component: OrderList },
        { path: '/powerList', component: PowerList },
        { path: '/shopSort', component: ShopSort },
        { path: '/sortParam', component: SortParam },
        { path: '/visualization', component: Visualization },
      ]
    }
  ]
})

export default Router
