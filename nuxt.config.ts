// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    modules: ['@nuxt/ui-pro', '@nuxt/content', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/i18n', '@vite-pwa/nuxt'],
    devtools: {enabled: true},
    vite: {
        server: {
            fs: {
                strict: false,
            }
        }
    },
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        },
        layoutTransition: false,
        keepalive: false,
        head: {
            link: [
                {rel: 'apple-touch-icon', href: '/icon-192x192.png'},
                {rel: 'manifest', href: '/manifest.webmanifest'}

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
        devOptions: {
            enabled: true,
            type: 'module',
        },
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: [
            'favicon.ico',
            'robots.txt',
            'icon-192x192.png',
            'icon-512x512.png'
        ],
        manifest: {
            name: 'JOTT.MEDIA - Your Office for Development and Design',
            short_name: 'JOTT.MEDIA',
            description: 'JOTT.MEDIA Your Office for Development and Design',
            theme_color: '#3b8070',
            background_color: '#ffffff',
            display: 'standalone',
            orientation: 'portrait',
            scope: '/',
            start_url: '/',
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
            navigateFallback: null,
            globPatterns: [
                '**/*.{js,css,html,png,svg,ico,jpg,jpeg,webp,woff,woff2}'
            ],
            globIgnores: [
                '**/node_modules/**/*',
                '**/*.vue',
                '**/*.html',
                '**/*.json',
                '**/@fs/**/*',
                '**/locales/**/*',
                '**/pages/**/*',
                '**/components/**/*',
                '**/layouts/**/*'
            ],

            navigateFallbackDenylist: [
                /^\/_nuxt\//,
                /^\/api\//,
                /^\/__/,
                /^\/manifest\.webmanifest$/,
                /^\/favicon\.ico$/,
                /^\/_ipx\//,
                /^.*\.json(\?.*)?$/,
                /^.*@fs.*$/,
                /^.*locales.*\.json$/,
                /^\/team\/.*$/,
                /^\/blog\/.*$/,
            ],

            runtimeCaching: [
                {
                    urlPattern: /^\/(?:de|en)?(?:\/(?:privacy|imprint))?$/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'pages-cache',
                        networkTimeoutSeconds: 3,
                        expiration: {
                            maxEntries: 20,
                            maxAgeSeconds: 60 * 60 * 24
                        }
                    }
                },
                {
                    // Images cache
                    urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'images-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 60 * 60 * 24 * 30
                        }
                    }
                },
                {
                    // JS/CSS assets cache
                    urlPattern: /\/_nuxt\/.*\.(js|css)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'static-assets',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 60 * 60 * 24 * 7
                        }
                    }
                }

            ],

            skipWaiting: true,
            clientsClaim: true
        },
        client: {
            installPrompt: true,
            periodicSyncForUpdates: 20
        },
    },

    i18n: {
        defaultLocale: 'de',
        strategy: 'prefix_except_default',
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
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            fallbackLocale: 'de'
        }
    },
})