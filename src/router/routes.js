const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/order', component: () => import('pages/orderItem.vue') },
      { path: '/admin/ninetynine/oyatsu', component: () => import('pages/admin/home.vue') },
      { path: '/track', component: () => import('pages/tracking.vue') },
    ],
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
