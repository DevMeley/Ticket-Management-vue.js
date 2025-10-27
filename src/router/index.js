import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Signup from "../Pages/auth/Signup.vue";
import LandingPage from "../Pages/LandingPage.vue";
import Signin from "../Pages/auth/Signin.vue";
import Dashboard from "../Pages/Dashboard.vue";
import Setting from "../Pages/Setting.vue";
import TicketPage from "../Pages/TicketPage.vue";
import GuardianLayout from "../components/GuardianLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Landing", component: LandingPage },
    { path: "/auth/signin", name: "signin", component: Signin },
    { path: "/auth/signup", name: "Signup", component: Signup },
    {
      path: "/dashboard",
      component: GuardianLayout,
      children: [
        {
          path: "",
          name: "Dashboard",
          component: Dashboard,
          meta: { requiresAuth: true },
        },
        {
          path: "tickets",
          name: "Tickets",
          component: TicketPage,
          meta: { requiresAuth: true },
        },
        {
          path: "setting",
          name: "Setting",
          component: Setting,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach((to, _, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/auth/Signin");
  } else {
    next();
  }
});

export default router;
