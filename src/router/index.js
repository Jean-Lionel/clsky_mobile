import { createRouter, createWebHistory } from '@ionic/vue-router';
import { authGuard } from './guards';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['ADMINISTRATEUR', 'ENQUETEUR']
    }
  },
  {
    path: '/survey',
    name: 'Survey',
    component: () => import('@/views/SurveyPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['ENQUETEUR', 'ADMINISTRATEUR']
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(authGuard);

export default router;