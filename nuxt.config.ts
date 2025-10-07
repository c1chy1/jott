// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    css: ['~/assets/css/main.css'],
    modules: ['@nuxt/ui-pro', '@nuxt/content', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/i18n', '@vite-pwa/nuxt'],
    devtools: {enabled: true},
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        },
        layoutTransition: false,
        keepalive: false,
        head: {
            link: [
                {rel: 'manifest', href: '/manifest.webmanifest'},
                {rel: 'apple-touch-icon', href: '/icon-192x192.png'}
            ],
            meta: [
                {name: 'theme-color', content: '#3b8070'},
                {name: 'apple-mobile-web-app-capable', content: 'yes'},
                {name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'},
                {name: 'mobile-web-app-capable', content: 'yes'},
                {name: 'application-name', content: 'JOTT.MEDIA'},
                {name: 'apple-mobile-web-app-title', content: 'JOTT.MEDIA'}
            ]
        }
    },

    pwa: {
        devOptions: {enabled: true},
        registerType: 'autoUpdate',
        includeAssets: [
            'favicon.ico',
            'robots.txt',
            'icon-192x192.png',
            'icon-512x512.png'
        ],
        manifest: {
            name: 'JOTT.MEDIA',
            short_name: 'JOTT.MEDIA',
            description: 'JOTT.MEDIA Your Office for Development and Design',
            theme_color: '#3b8070',
            background_color: '#ffffff',
            start_url: '/',
            scope: '/',
            display: 'standalone',
            orientation: 'portrait',
            lang: 'de',
            dir: 'ltr',
            prefer_related_applications: false,
            icons: [
                {
                    src: '/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any'
                },
                {
                    src: '/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable'
                }
            ]
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
            navigateFallback: '/',
            navigateFallbackDenylist: [/^\/_nuxt\//, /^\/api\//, /^\/__/],
            clientsClaim: true,
            skipWaiting: true,
            cleanupOutdatedCaches: true,
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'google-fonts',
                        expiration: {maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365}
                    }
                },
                {
                    urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'jsdelivr-cdn',
                        expiration: {maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30}
                    }
                },
                {
                    urlPattern: ({request}) => request.mode === 'navigate',
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'pages',
                        networkTimeoutSeconds: 3,
                        expiration: {maxEntries: 50, maxAgeSeconds: 60 * 60 * 24}
                    }
                }
            ]
        }
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
})