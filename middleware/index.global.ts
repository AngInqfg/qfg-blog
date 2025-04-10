import { defineNuxtRouteMiddleware } from "nuxt/app";
export default defineNuxtRouteMiddleware((to) => {
    if (to.path === '/my') {
        return true
    }
    return true
})