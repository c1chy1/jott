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
                authors: 'pt-4',
                body: 'p-3 m-0',
                description: 'mb-0 text-xs text-pretty text-(--color-jm-contrast-black) p-0',
                meta: 'px-0 mb-0 p-0',
                root: 'relative group/blog-post flex flex-col overflow-hidden p-0 m-0',
                title: 'text-xl uppercase font-extrabold leading-6 p-0',
                header: 'block m-0 p-0 bg-cover bg-center'
            },
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
                color: "secondary",
            },
            slots: {
                base: 'inline-block border-[3px] border-jm-primary-brown rounded px-3 py-2 uppercase font-[800] text-sm text-jm-primary-brown hover:text-jm-secondary-white hover:bg-jm-primary-brown  transition-all duration-300',
            }
        },
        size: {
            xs: {
                base: 'px-2 py-1 text-xs gap-1',
                leadingIcon: 'size-4',
                leadingAvatarSize: '3xs',
                trailingIcon: 'size-4'
            },
            sm: {
                base: 'px-2.5 py-1.5 text-xs gap-1.5',
                leadingIcon: 'size-4',
                leadingAvatarSize: '3xs',
                trailingIcon: 'size-4'
            },
            md: {
                base: 'px-2.5 py-1.5 text-sm gap-1.5',
                leadingIcon: 'size-5',
                leadingAvatarSize: '2xs',
                trailingIcon: 'size-5'
            },
            lg: {
                base: 'px-3 py-2 text-sm gap-2',
                leadingIcon: 'size-5',
                leadingAvatarSize: '2xs',
                trailingIcon: 'size-5'
            },
            xl: {
                base: 'px-3 py-2 text-base gap-2',
                leadingIcon: 'size-6',
                leadingAvatarSize: 'xs',
                trailingIcon: 'size-6'
            }
        },
        variables: {
            light: {
                background: '255 255 255',
                foreground: '000 000 000'
            },
            dark: {
                background: '255 255 255',
                foreground: '000 000 000'
            },
        }
    },
})