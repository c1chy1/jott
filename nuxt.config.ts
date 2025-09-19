// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    modules: ['@nuxt/ui-pro', '@nuxt/content', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/i18n'],
    devtools: {enabled: true},
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        },
        layoutTransition: false,
        keepalive: false
    },

    i18n: {
        defaultLocale: 'de',
        langDir: 'locales',
        locales: [
            {
                code: 'de',
                language: 'de-DE',
                name: 'Deutsch',
                file: 'de-DE.json',
            },
            {
                code: 'en',
                language: 'en-GB',
                name: 'English',
                file: 'en-GB.json',
            },
        ],
    },
    ssr: true
})