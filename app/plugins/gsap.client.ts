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

            console.log(`Language change transition start: → ${newLocale}`)
            isTransitioning = true
            isLanguageTransition = true

            await closeShutters()
            console.log('Shutters closed - changing language')

            await setLocaleFunction(newLocale)
            console.log('Language changed')

            await new Promise(resolve => setTimeout(resolve, 300))

            await openShutters()
            console.log('Language change transition complete!')
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
            if (!from.name || isTransitioning || isLanguageTransition || shouldSkipTransition(from, to)) return

            console.log(`Transition start: ${from.path} → ${to.path}`)
            isTransitioning = true
            await closeShutters()
            console.log('Shutters closed - navigation can proceed')
        })

        router.afterEach(async (to, from) => {
            if (!isTransitioning || !from.name || isLanguageTransition || shouldSkipTransition(from, to)) return

            console.log(`Navigation complete: ${from.path} → ${to.path}`)
            await new Promise(resolve => setTimeout(resolve, 200))
            await openShutters()
            console.log('Transition complete!')
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