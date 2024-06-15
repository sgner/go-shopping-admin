import { defineStore } from "pinia";
import { ref } from "vue";
export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || false);

    const setTheme = (changeTheme) => {
        theme.value = changeTheme;
        localStorage.setItem('theme', changeTheme);
    };

    return {
        theme,
        setTheme
    };
}, {
    persist: true
});