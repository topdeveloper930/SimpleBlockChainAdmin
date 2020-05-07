import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './components/Register.vue'
import Validate from './components/Validate.vue'
import Dashboard from './views/Dashboard.vue'
import DashboardHome from './components/DashboardHome.vue'
import DashboardWelcome from './components/DashboardWelcome.vue'
import Groups from './components/Groups.vue'
import NewGroup from './components/NewGroup.vue'
import Templates from './components/Templates.vue'
import NewTemplate from './components/NewTemplate.vue'
import Chains from './components/Chains.vue'
import NewChain from './components/NewChain.vue'
import Nodes from './components/Nodes.vue'
import NewNode from './components/NewNode.vue'
import Portal from './components/Portal.vue'
import Dapps from './components/Dapps.vue'
import Settings from './components/Settings.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/validate',
      name: 'validate',
      component: Validate
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'home',
          component: DashboardHome
        },
        {
          path: 'welcome',
          component: DashboardWelcome
        },
        {
          path: 'groups',
          component: Groups
        },
        {
          path: 'groups/new',
          component: NewGroup
        },
        {
          path: 'templates',
          component: Templates
        },
        {
          path: 'templates/new',
          component: NewTemplate
        },
        {
          path: 'chains',
          component: Chains
        },
        {
          path: 'chains/new',
          component: NewChain
        },
        {
          path: 'nodes',
          component: Nodes
        },
        {
          path: 'nodes/new',
          component: NewNode
        },
        {
          path: 'portal',
          component: Portal
        },
        {
          path: 'dapps',
          component: Dapps
        },
        {
          path: 'settings',
          component: Settings
        },
      ]
    },
  ]
})
