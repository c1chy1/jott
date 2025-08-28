<template>
  <component ref="target" :is="type" :class="[typeToClass[format ?? type], {'h-animation-bigger': targetIsVisible || targetIsAlreadyVisible}]" class="my-0 mb-4">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { useWindowSize, useIntersectionObserver } from '@vueuse/core'
const { width, height } = useWindowSize()

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  format: {
    type: String,
    default: null
  }
})

const typeToClass = {
  h1: width.value > 768 ? 'text-4xl' : 'text-3xl',
  h2: width.value > 768 ? 'text-3xl' : 'text-2xl',
  h3: width.value > 768 ? 'text-2xl uppercase' : 'text-xl uppercase',
  h4: width.value > 768 ? 'text-xl uppercase' : 'text-lg uppercase',
  h5: width.value > 768 ? 'text-lg uppercase' : 'text-base uppercase',
  h6: width.value > 768 ? 'text-sm mb-8' : 'text-sm mb-6',
}

const target = ref(null)
const targetIsVisible = ref(false)
const targetIsAlreadyVisible = ref(false)
const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      targetIsVisible.value = isIntersecting
      if (isIntersecting) targetIsAlreadyVisible.value = true
    },
)
</script>

<style lang="scss">
@keyframes h-bigger {
  0% {
    font-variation-settings: "wght" 400;
    letter-spacing: 0.03em;
  }
  40% {
    font-variation-settings: "wght" 600;
    letter-spacing: 0.02em;
  }
  100% {
    font-variation-settings: "wght" 800;
    letter-spacing: 0;
  }
}

.h-animation-bigger b {
  animation: h-bigger;
  animation-duration: 1s;
  animation-timing-function: linear;
}
</style>