// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from "../components/Home.vue";
import LoginForm from "../components/LoginForm.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: LoginForm },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' }); 
  } else {
    next();
  }
});

export default router;

