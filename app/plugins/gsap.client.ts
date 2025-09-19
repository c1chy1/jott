import {defineNuxtPlugin} from '#app'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {

        gsap.registerPlugin(ScrollTrigger)

        nuxtApp.provide('gsap', {
            ...gsap,
            ScrollTrigger
        })

        const router = useRouter()
        let isTransitioning = false
        let isLanguageTransition = false
        let overlay: HTMLElement | null = null

        const getOverlay = (): HTMLElement => {
            if (!overlay) {
                overlay = document.createElement('div')
                overlay.className = 'fixed inset-0 bg-black z-[9999] pointer-events-none'
                overlay.style.cssText = 'opacity:0;will-change:clip-path,opacity;transform:translateZ(0)'
                document.body.appendChild(overlay)
            }
            return overlay
        }

        const closeShutters = (): Promise<void> => {
            return new Promise<void>((resolve) => {
                const el = getOverlay()
                el.style.opacity = '1'

                gsap.set(el, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                })

                gsap.to(el, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%, 0% 50%, 100% 50%, 100% 100%, 0% 100%)",
                    duration: 1.0,
                    ease: "power2.out",
                    onComplete: resolve
                })
            })
        }

        const openShutters = (): Promise<void> => {
            return new Promise<void>((resolve) => {
                const el = getOverlay()

                gsap.timeline()
                    .to({}, {duration: 0.4})
                    .to(el, {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                        duration: 1.0,
                        ease: "power2.in",
                        onComplete: () => {
                            el.style.opacity = '0'
                            isTransitioning = false
                            isLanguageTransition = false
                            resolve()
                        }
                    })
            })
        }

        const animatedLanguageChange = async (setLocaleFunction: (locale: string) => Promise<void>, newLocale: string) => {
            if (isTransitioning || isLanguageTransition) return

            isTransitioning = true
            isLanguageTransition = true

            await closeShutters()

            await setLocaleFunction(newLocale)

            await new Promise(resolve => setTimeout(resolve, 300))

            await openShutters()
        }

        const shouldSkipTransition = (from: any, to: any): boolean => {
            const fromPath = from.path
            const toPath = to.path

            if (fromPath === toPath && to.hash) {
                return true
            }

            return false
        }

        router.beforeEach(async (to, from) => {

            if (!from.name || isTransitioning || isLanguageTransition || shouldSkipTransition(from, to)) {
                return
            }

            isTransitioning = true
            await closeShutters()
        })

        router.afterEach(async (to, from) => {
            if (!from.name) {
                if (overlay) {
                    overlay.style.opacity = '0'
                }
                isTransitioning = false
                isLanguageTransition = false
                return
            }

            if (!isTransitioning || isLanguageTransition || shouldSkipTransition(from, to)) {
                return
            }

            await new Promise(resolve => setTimeout(resolve, 200))
            await openShutters()
        })

        return {
            provide: {
                cleanupTransitions: () => {
                    if (overlay?.parentNode) {
                        overlay.parentNode.removeChild(overlay)
                    }
                },
                animatedLanguageChange
            }
        }
    }
})