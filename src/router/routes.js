const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/admin',                         
    component: () => import('layouts/MainLayout.vue'), 
    children: [
      { path: 'home', component: () => import('pages/admin/home.vue') }
    ],
  },
  {
    path: '/admin',                         
    component: () => import('layouts/MainLayout.vue'), 
    children: [
      { path: 'login', component: () => import('pages/admin/login.vue') }
    ],
  },
  {
    path: '/admin',                         
    component: () => import('layouts/MainLayout.vue'), 
    children: [
      { path: 'login', component: () => import('pages/admin/login.vue') }
    ],
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
