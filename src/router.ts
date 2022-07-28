import { createWebHashHistory, createRouter } from "vue-router";
import { routes } from "./config/routes.config";

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router