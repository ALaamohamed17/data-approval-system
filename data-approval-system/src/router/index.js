import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
{
  path: '/',
  redirect: '/submit'
}
,
    {
  path: '/submit',
  name: 'SubmissionForm',
  component: () => import('../views/SubmissionForm.vue')
},
{
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('../views/Dashboard.vue')
},
{
  path: '/approval',
  name: 'Approval',
  component: () => import('../views/Approval.vue')
}


  ],
})

export default router
