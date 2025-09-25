export default defineAppConfig({
    ui: {
        carousel: {
            slots: {
                root: 'relative focus:outline-none',
                viewport: 'overflow-hidden',
                container: 'flex items-start',
                item: 'min-w-0 shrink-0 basis-full',
                controls: '',
                arrows: '',
                prev: 'absolute rounded-full',
                next: 'absolute rounded-full',
                dots: 'absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3',
                dot: [
                    'cursor-pointer size-3 bg-accented rounded-full',
                    'transition'
                ]
            }
        },
        navigationMenu: {
            slots: {
                arrow: 'hidden',
                base: 'text-(--color-jm-secondary-grey)',
                link: 'block font-[800] text-red nuxt-ui-primary-50 text-(--color-nuxt-ui-primary-100) jm-contrast-black text-highlighted jm-primary-green uppercase hover:!text-jm-primary-green-light'
            }
        },
        container: {
            base: 'max-w-(--container-3xl) mx-auto px-4 sm:px-6 lg:px-8 z-10',
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
    },
    uiPro: {
        footer: {
            slots: {
                root: 'relative',
                top: 'lg:pt-4 contents',
                bottom: 'py-0  z-30',
                left: 'max-w-(--container-5xl)',
            }
        },
        blogPost: {
            slots: {
                title: 'text-xl font-bold uppercase',
                body: 'px-2! pb-0!',
                date: 'mt-0!',
                root: 'h-64',
            },
            variants: {
                variant: {
                    soft: {
                        body: 'hidden',
                        header: 'block h-full m-0 p-0 bg-cover bg-center flex-1'
                    },
                    subtle: {
                        body: 'p-4!',
                        root: 'h-auto',
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
                wrapper: 'mt-4',
                container: 'mx-auto px-4 py-8 sm:px-6 lg:px-8 ',
                headline: 'mb-4 mt-0',
                body: 'mt-6',
                footer: 'mt-8',
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
    }
})