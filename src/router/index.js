import { createRouter, createWebHistory } from '@ionic/vue-router';
import { authGuard } from './guards';
import ProfilePage from '@/views/ProfilePage.vue';
import SettingsPage from '@/views/SettingsPage.vue';
import ReportPage from '../views/ReportPage.vue';
import SurveyEdit from '../views/SurveyEdit.vue';
import RegisterPage from '../views/RegisterPage.vue';

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
  },
  {
    path: '/tabs/home',
    name: 'home',
    component: () => import('@/views/DashboardPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['ENQUETEUR', 'ADMINISTRATEUR']
    },
    
  },
  {
    path: '/tabs/profile',
    component: ProfilePage,
    meta: {
      requiresAuth: true,
      roles: ['ENQUETEUR', 'ADMINISTRATEUR']
    }
  },
  {
    path: '/users/add',
    component: RegisterPage,
    meta: {
      requiresAuth: true,
      roles: ['ENQUETEUR', 'ADMINISTRATEUR']
    }
  },
  {
    path: '/tabs/settings',
    component: SettingsPage,
    meta: {
      requiresAuth: true,
      roles: ['ENQUETEUR', 'ADMINISTRATEUR']
    }
  },
  {
    path: '/tabs/reports',
    component: ReportPage,
    meta: {
      requiresAuth: true,
      roles: ['ENQUETEUR', 'ADMINISTRATEUR']
    }
  },
  {
    path: '/survey/:surveyId',
    component: SurveyEdit,
    meta: {
      requiresAuth: true,
      roles: ['ENQUETEUR', 'ADMINISTRATEUR']
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(authGuard);

export default router;