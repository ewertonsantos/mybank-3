import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
  },

  // {
  //   path: '/',
  //   name: 'Layout',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/about',
  //       name: 'About',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //     },
  //     {
  //       path: '/contas',
  //       name: 'Contas',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "about" */ '../views/contas/lista.vue')
  //     },
  //     // {
  //     //   path: '/clientes',
  //     //   name: 'Clientes',
  //     //   // route level code-splitting
  //     //   // this generates a separate chunk (about.[hash].js) for this route
  //     //   // which is lazy-loaded when the route is visited.
  //     //   component: () => import(/* webpackChunkName: "about" */ '../views/clientes/lista.vue')
  //     // },
  //     // {
  //     //   path: '/formulario',
  //     //   name: 'Cliente Formulario',
  //     //   // route level code-splitting
  //     //   // this generates a separate chunk (about.[hash].js) for this route
  //     //   // which is lazy-loaded when the route is visited.
  //     //   component: () => import(/* webpackChunkName: "about" */ '../views/clientes/formulario.vue')
  //     // },
      
  
  //   ]
  // },
  {
    path: '/contas',
    name: 'Contas',
    component: Layout,
    children: [
      {
        path: '/contas/lista',
        name: 'Lista de Contas',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/contas/lista.vue')
      },
  
    ]
  },

  {
    path: '/clientes',
    name: 'Clientes',
    component: Layout,
    children: [
      {
        path: '/clientes/lista',
        name: 'Lista',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/clientes/lista.vue')
      },
          
  
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
