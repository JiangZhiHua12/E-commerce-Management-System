import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import UserView from "@/views/UserView";
import RoleView from "@/views/RoleView";
import PermissionsView from "@/views/PermissionsView";
import CommodityView from "@/views/CommodityView";
import ClassifyView from "@/views/ClassifyView";
import ProductCategoryView from "@/views/ProductCategoryView";
import OrderView from "@/views/OrderView";
import DataReportsView from "@/views/DataReportsView";
import WelcomeVIew from "@/views/WelcomeVIew";
import addProduct from "@/views/addProduct";
import Attribute from "@/views/Attribute";
import addProductAttr from "@/views/addProductAttr";
import ParameterView from "@/views/ParameterView";



const routes = [
  {
    path:'/',
    name: 'h',
    component:HomeView,
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/home',
    name: "home",
    component: HomeView,
    redirect:'/welcome',
    children:[
      {path: '/welcome',component: WelcomeVIew},
      {path:'/user', component: UserView},
      {path: '/role', component: RoleView},
      {path: '/Permissions', component: PermissionsView},
      {path: '/commodity', name:"commodity",component: CommodityView},
      {path: '/addProduct',name:'addProduct',component: addProduct},
      {path: '/classify', component: ClassifyView},
      {path: '/ProductCategory', component: ProductCategoryView},
      {path: '/order', component: OrderView},
      {path: '/DataReports', component: DataReportsView},
      {path: '/Attribute', name: 'Attribute',component: Attribute},
      {path: '/addProductAttr', name: 'addProductAttr',component: addProductAttr},
      {path: '/ParameterView', name: 'ParameterView',component: ParameterView}
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from,next) => {

 if (to.path==='/login') return next()

  var token=window.localStorage.getItem('token_jzh')
  if (!token){
    return next('/login')
  }
  next()

})

export default router
