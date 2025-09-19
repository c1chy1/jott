// app/composables/useElementAnimation.ts
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'

export function useElementAnimation() {
    const width = ref(0)

    // Aktualisiere die Breite beim Laden und bei Größenänderungen
    function updateWidth() {
        width.value = window?.innerWidth || 0
    }

    function setupResizeListener() {
        updateWidth()
        window.addEventListener('resize', updateWidth)
    }

    function cleanupResizeListener() {
        window.removeEventListener('resize', updateWidth)
    }

    onMounted(setupResizeListener)
    onUnmounted(cleanupResizeListener)

    // Klassen für verschiedene Elementtypen basierend auf Bildschirmbreite
    const typeToClass = computed(() => ({
        h1: width.value > 768 ? 'text-4xl' : 'text-3xl',
        h2: width.value > 768 ? 'text-3xl' : 'text-2xl',
        h3: width.value > 768 ? 'text-2xl uppercase' : 'text-xl uppercase',
        h4: width.value > 768 ? 'text-xl uppercase' : 'text-lg uppercase',
        h5: width.value > 768 ? 'text-lg uppercase' : 'text-base uppercase',
        h6: width.value > 768 ? 'text-sm mb-8' : 'text-sm mb-6',
    }))

    function getClassForType(type: string): string {
        return typeToClass.value[type as keyof typeof typeToClass.value] || ''
    }

    function getAnimationClass(type: string): string {
        // Wichtig: Genau die gleichen Klassennamen verwenden wie in der main.css definiert
        return type.startsWith('p') ? 'p-animation-bigger' : 'h-animation-bigger'
    }

    function useElementObserver(elementRef: any) {
        const isVisible = ref(false)
        const wasVisible = ref(false)
        let observer: IntersectionObserver | null = null

        function initObserver() {
            if (!elementRef.value) return

            observer = new IntersectionObserver((entries) => {
                const entry = entries[0]
                if (entry) {
                    isVisible.value = entry.isIntersecting
                    if (entry.isIntersecting) {
                        wasVisible.value = true
                    }
                }
            })

            observer.observe(elementRef.value)
        }

        function setupObserver() {
            // Zeitverzögerung, um sicherzustellen, dass das Element vorhanden ist
            setTimeout(initObserver, 100)
        }

        onMounted(setupObserver)

        // Überwache Änderungen am Element-Ref
        watch(() => elementRef.value, (newVal) => {
            if (newVal && !observer) {
                initObserver()
            }
        })

        function cleanupObserver() {
            if (observer && elementRef.value) {
                observer.unobserve(elementRef.value)
                observer.disconnect()
            }
        }

        onUnmounted(cleanupObserver)

        return {isVisible, wasVisible}
    }

    return {
        width,
        getClassForType,
        getAnimationClass,
        useElementObserver
    }
}