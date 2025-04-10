import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
export const useStore = defineStore('useStore', () => {
    const theme = useLocalStorage<'white' | 'black'>('theme', 'white')
    return {
        theme
    }
})