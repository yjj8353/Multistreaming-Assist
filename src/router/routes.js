const routes = [
  {
    path: '/',
    component: () => import('layouts/Body.vue'),
    children: [
      { path: '', component: () => import('pages/Streaming.vue') },
      { path: 'recording', component: () => import('pages/Recording.vue') },
      { path: 'contributors', component: () => import('pages/Contributors.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
