export default defineAppConfig({
    uiPro: {
        footer: {
            slots: {
                root: 'relative',
                top: 'lg:pt-4 contents',
                bottom: 'py-8 lg:py-0 z-2',
                left: 'max-w-(--container-5xl)',
            }
        },
        blogPost: {
            slots: {
                title: 'text-xl font-bold uppercase',
                body: 'px-2! pb-0!',
                date: 'mt-0!'
            },
            variants: {
                variant: {
                    soft: {
                        body: 'hidden',
                        header: 'block h-full m-0 p-0 bg-cover bg-center flex-1'
                    },
                    subtle: {
                        body: 'p-4!',
                        header: 'block m-0 p-0 gap-0! bg-cover bg-center',
                        description: 'mb-0 text-xs text-pretty text-(--color-jm-contrast-black) p-2',
                        title: 'text-lg uppercase font-bold leading-6',
                    },
                }
            }
        },

        pageHero: {
            slots: {
                root: 'relative isolate',
                wrapper: '',
                headline: 'mb-4',
            },
            variants: {
                orientation: {
                    horizontal: {
                        container: 'lg:grid-cols-2 lg:items-center',
                        description: 'text-pretty'
                    },
                    vertical: {
                        container: '',
                        headline: 'justify-center',
                        wrapper: 'text-center',
                        description: 'text-balance',
                        links: 'justify-center'
                    }
                },
                reverse: {
                    true: {
                        wrapper: 'order-last'
                    }
                },
                headline: {
                    true: {
                        headline: 'font-semibold text-primary flex items-center gap-1.5'
                    }
                },
                title: {
                    true: {
                        description: 'mt-6'
                    }
                }
            }
        }
    },
    ui: {
        navigationMenu: {
            slots: {
                arrow: 'hidden',
                base: 'text-(--color-jm-secondary-grey)',
                link: 'block font-[800] text-red nuxt-ui-primary-50 text-(--color-nuxt-ui-primary-100) jm-contrast-black text-highlighted jm-primary-green uppercase hover:!text-jm-primary-green-light'
            }
        },
        container: {
            base: 'max-w-(--container-3xl) mx-auto px-4 sm:px-6 lg:px-8 py-0',
        },
        colors: {
            primary: 'nuxt-ui-primary',
            secondary: 'nuxt-ui-brown',
        },
        button: {

            defaultVariants: {
                color: "primary",
            },
            slots: {
                base: 'inline-block border-[3px] rounded px-3 py-2 uppercase font-[800] text-sm transition-all duration-300',
            },
            variants: {
                variant: {
                    ghost: 'w-12 h-12 border-transparent transition-opacity duration-300 opacity-80 hover:opacity-100  rounded-full z-50 cursor-pointer flex justify-center items-center rounded-full'
                }
            },
        },
    }
})