// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    modules: ['@nuxt/ui-pro', '@nuxt/content', '@pinia/nuxt', '@nuxt/image'],
    devtools: {enabled: true},
    app: {
        pageTransition: false,
        layoutTransition: false
    }
})
