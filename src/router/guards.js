import store from '../store';

export function authGuard(to, from, next) {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRoles = to.meta.roles;

  // Si la route nécessite une authentification
  if (requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
    return;
  }

  // Si la route nécessite des rôles spécifiques
  // if (requiredRoles && !requiredRoles.includes(store.getters.userRole)) {
  //   next('/dashboard');
  //   return;
  // }

  next();
}