import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/message",
    name: "Message",
    component: () => import("../views/Message.vue"),
    meta: {
      authRequired: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      authRequired: true
    }
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      authRequired: true
    }
  },
  {
    path: "/sign-in",
    name: "signin",
    component: () => import("../views/Signin.vue")
  },
  {
    path: "/join",
    name: "join",
    component: () => import("../views/Join.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
