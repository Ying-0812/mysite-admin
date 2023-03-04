import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '控制台',
        icon: 'dashboard',
        auth: true
      }
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/personalCenter',
    children: [{
      path: 'personalCenter',
      name: 'personalCenter',
      component: () => import('@/views/personalcenter/index'),
      meta: {
        title: '个人中心',
        icon: 'dashboard',
        auth: true
      },
      hidden:true
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/firstpage',
    children: [{
      path: 'firstpage',
      name: 'firstPage',
      component: () => import('@/views/firstPage/index'),
      meta: {
        title: '首页标语',
        icon: 'el-icon-s-home',
        auth: true
      }
    }]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article',
    name: 'Article',
    meta: {
      title: '文章管理',
      icon: 'el-icon-document'
    },
    children: [{
        path: '/articleList',
        name: 'articleList',
        component: () => import('@/views/articleList/index'),
        meta: {
          title: '文章列表',
          icon: 'el-icon-s-order',
          auth: true
        }
      },
      {
        path: '/articleSort',
        name: 'articleSort',
        component: () => import('@/views/articleSort/index'),
        meta: {
          title: '文章分类',
          icon: 'el-icon-menu',
          auth: true
        }
      },
      {
        path: '/articleAdd',
        name: 'articleAdd',
        component: () => import('@/views/articleAdd/index'),
        meta: {
          title: '添加文章',
          icon: 'el-icon-circle-plus',
          auth: true
        }
      },
      {
        path: '/articleUpdate',
        name: 'articleUpdate',
        component: () => import('@/views/articleUpdate/index'),
        meta: {
          title: '修改文章',
          icon: 'el-icon-circle-plus',
          auth: true
        },
        hidden:true
      }
    ]
  },

  {
    path: '/project',
    component: Layout,
    redirect: '/project',
    name: 'Project',
    meta: {
      title: '项目管理',
      icon: 'el-icon-suitcase'
    },
    children: [{
        path: '/projectList',
        component: () => import('@/views/project/projectList/index'),
        name: 'projectList',
        meta: {
          title: '项目列表',
          icon: 'el-icon-notebook-1',
          auth: true
        },
      },
      {
        path: '/projectAdd',
        component: () => import('@/views/project/projectAdd/index'),
        name: 'projectAdd',
        meta: {
          title: '添加项目',
          icon: 'el-icon-link',
          auth: true
        }
      }
    ]
  },

  {
    path: '/reviews',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Reviews',
      component: () => import('@/views/reviews/index'),
      meta: {
        title: '评论管理',
        icon: 'el-icon-chat-line-round',
        auth: true
      }
    }]
  },

  {
    path: '/message',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Message',
      component: () => import('@/views/message/index'),
      meta: {
        title: '留言板',
        icon: 'el-icon-copy-document',
        auth: true
      }
    }]
  },

  {
    path: '/aboutMe',
    component: Layout,
    children: [{
      path: 'index',
      name: 'aboutMe',
      component: () => import('@/views/aboutMe/index'),
      meta: {
        title: '关于我',
        icon: 'el-icon-s-custom',
        auth: true
      }
    }]
  },

  {
    path: '/setUp',
    component: Layout,
    children: [{
      path: 'index',
      name: 'setUp',
      component: () => import('@/views/setUp/index'),
      meta: {
        title: '设置',
        icon: 'el-icon-s-tools',
        auth: true
      }
    }]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
