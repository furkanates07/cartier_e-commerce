import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/home/index.vue";
import ProductView from "@/views/product/index.vue";
import CartView from "@/views/cart/index.vue";
import FavoritesView from "@/views/favorites/index.vue";
import ProfileView from "@/views/profile/index.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/product/:id", component: ProductView },
  { path: "/cart", component: CartView },
  { path: "/favorites", component: FavoritesView },
  { path: "/profile", component: ProfileView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
