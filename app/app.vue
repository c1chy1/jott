<template>
  <UApp>
    <UMain
        :class="{'cursor-down': isMouseDown, 'cursor-show': isMouseShow}"
        class="custom-cursor overflow-x-hidden scroll-smooth relative"
    >
      <div
          ref="overlayRef"
          :style="{ opacity: overlayVisible ? 1 : 0 }"
          class="fixed inset-0 bg-black z-[9999] pointer-events-none"
      ></div>
      <div
          ref="cursorElement"
          class="cursor-dot"
      ></div>
      <div :style="{ visibility: contentVisible ? 'visible' : 'hidden' }">
        <NuxtLayout>
          <NuxtPage/>
        </NuxtLayout>
      </div>
    </UMain>
  </UApp>
</template>

<script lang="ts" setup>
import {gsap} from 'gsap'

const cursorElement = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)
const isMouseDown = ref(false)
const isMouseShow = ref(true)
const overlayVisible = ref(true)
const contentVisible = ref(false)

let mouseX = 0
let mouseY = 0
let currentX = 0
let currentY = 0
let animationId: number

const updateCursorPosition = (e: MouseEvent) => {
  if (process.client) {
    isMouseShow.value = true
    mouseX = e.clientX - 10
    mouseY = e.clientY - 10
  }
}

const animateCursor = () => {

  const speed = 0.15

  currentX += (mouseX - currentX) * speed
  currentY += (mouseY - currentY) * speed

  if (cursorElement.value) {
    gsap.set(cursorElement.value, {
      x: currentX,
      y: currentY
    })
  }

  animationId = requestAnimationFrame(animateCursor)
}

const updateCursorDown = () => {
  isMouseDown.value = true

  if (cursorElement.value) {
    gsap.to(cursorElement.value, {
      scale: 2,
      duration: 0.1,
      ease: "back.out(1.7)"
    })
  }
}

const updateCursorUp = () => {
  isMouseDown.value = false

  if (cursorElement.value) {
    gsap.to(cursorElement.value, {
      scale: 1,
      duration: 0.15,
      ease: "back.out(1.7)"
    })
  }
}

const updateCursorLeave = () => {
  isMouseShow.value = false

  if (cursorElement.value) {
    gsap.to(cursorElement.value, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out"
    })
  }
}

const updateCursorEnter = () => {
  isMouseShow.value = true

  if (cursorElement.value) {
    gsap.to(cursorElement.value, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    })
  }
}

async function initializeOverlayAnimation() {
  await nextTick()

  if (!overlayRef.value) return

  const overlay = overlayRef.value!
  gsap.set(overlay, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%, 0% 50%, 100% 50%, 100% 100%, 0% 100%)"
  })

  console.log('Starting page load animation...')

  setTimeout(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        overlayVisible.value = false
        console.log('Page load animation complete!')
      }
    })

    tl.call(() => {
      contentVisible.value = true
      console.log('Content now visible under closed shutters')
    }, [], 0.2)

        .to(overlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power2.out"
        }, 0.3)

  }, 200)
}

onMounted(() => {
  if (process.client) {
    initializeOverlayAnimation()

    if (cursorElement.value) {
      gsap.set(cursorElement.value, {
        x: -100,
        y: -100,
        opacity: 0,
        scale: 1
      })
    }

    animateCursor()

    window.addEventListener('mousemove', updateCursorPosition, {passive: true})
    window.addEventListener('mousedown', updateCursorDown)
    window.addEventListener('mouseup', updateCursorUp)
    document.addEventListener('mouseleave', updateCursorLeave)
    document.addEventListener('mouseenter', updateCursorEnter)
  }
})

onUnmounted(() => {
  if (process.client) {

    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    window.removeEventListener('mousemove', updateCursorPosition)
    window.removeEventListener('mousedown', updateCursorDown)
    window.removeEventListener('mouseup', updateCursorUp)
    document.removeEventListener('mouseleave', updateCursorLeave)
    document.removeEventListener('mouseenter', updateCursorEnter)
  }
})
</script>

<style>
@media (hover: hover) {
  * {
    cursor: none !important;
  }

  .custom-cursor {
    position: relative;
  }

  .cursor-dot {
    position: fixed;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    mix-blend-mode: difference;
    pointer-events: none;
    z-index: 99999;
    opacity: 0;
    will-change: transform;
    transform-origin: center;
  }

  .cursor-show .cursor-dot {
    opacity: 1;
  }
}
</style>