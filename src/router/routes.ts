import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Streaming.vue') },
      { path: 'recording', component: () => import('pages/Recording.vue') },
      { path: 'help', component: () => import('pages/Help.vue') }
    ]
  }

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '*',
  //   component: () => import('pages/Error404.vue')
  // }
]

export default routes
