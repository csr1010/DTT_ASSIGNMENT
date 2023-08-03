import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Houses/Home.vue";
import HouseDetail from "../views/Houses/HouseDetail.vue";
import CreateHouse from "../views/Houses/CreateHouse.vue";
import EditHouse from "../views/Houses/EditHouse.vue";

const routes = [
  {
    path: "/",
    name: "houses",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/:houseId",
    name: "houseDetail",
    component: HouseDetail,
  },
  {
    path: "/newHouse",
    name: "createHouse",
    component: CreateHouse,
  },

  {
    path: "/editHouse/:houseId",
    name: "editHouse",
    component: EditHouse,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
