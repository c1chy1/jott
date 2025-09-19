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
    <!--    <UFooter class="z-10 py-0 relative">
          <template #top>
            <UContainer class="py-0 max-w-(&#45;&#45;container-2xl)">
              <div class="flex justify-between items-end py-0">
                <div class="z-10">
                  <address class="not-italic">
                    JOTT.MEDIA GmbH<br>
                    Bahnhofstraße 33<br>
                    31675 Bückeburg<br>
                    <br>
                    <nuxt-link href="tel:+4957229184984">+49 5722 9184984</nuxt-link>
                    <br>
                    <nuxt-link href="mailto:hallo@jott.media">hallo@jott.media</nuxt-link>
                  </address>
                </div>
                <div class="text-right z-10">
                  <NuxtLink :to="localePath('/privacy')"
                            class="block font-[800] text-(&#45;&#45;color-jm-primary-green) uppercase"
                  >.{{ t('privacy') }}
                  </NuxtLink>
                  <NuxtLink :to="localePath('/imprint')"
                            class="block font-[800] text-(&#45;&#45;color-jm-primary-green) uppercase"
                  >.{{ t('imprint') }}
                  </NuxtLink>
                </div>
              </div>
            </UContainer>
          </template>
          <template #right>
            <NuxtImg
                alt="Footer Bottom"
                class="absolute pointer-events-none object-contain w-72 bottom-17.5 right-0 z-1"
                format="webp"
                src="/images/footer-box.png"
            />
          </template>
          <template #bottom>
            <div class="bg-(&#45;&#45;color-jm-primary-green) text-xl py-6 flex items-center justify-center z-2">
              <UContainer class="max-w-(&#45;&#45;container-2xl) text-sm">
                <p>© {{ new Date().getFullYear() }} JOTT.MEDIA – {{ t('AllRightsReserved') }}</p>
              </UContainer>
            </div>
          </template>
          <template #left>
            <div class="absolute left-0 bottom-14 w-full h-full bg-(&#45;&#45;color-jm-secondary-grey-lighter) -z-20"></div>
            <div
                ref="footerTop"
                class="absolute pointer-events-none left-1/2 bg-repeat-x -translate-x-1/2 w-screen h-[35rem] bottom-0 -z-0 bg-center bg-footer-top"
            />
          </template>
        </UFooter>-->
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

const {t} = useI18n()
const localePath = useLocalePath()

let mouseX = 0
let mouseY = 0
let currentX = 0
let currentY = 0
let animationId: number


const showFooter = useState('showFooter', () => true)

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
      const centerX = window.innerWidth / 2 - 10
      const centerY = window.innerHeight / 2 - 10

      mouseX = centerX
      mouseY = centerY
      currentX = centerX
      currentY = centerY

      gsap.set(cursorElement.value, {
        x: centerX,
        y: centerY,
        opacity: 1,
        scale: 1
      })
    }

    isMouseShow.value = true

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

  .minimal-layout .cursor-dot {
    background-color: var(--color-jm-primary-brown) !important;
    mix-blend-mode: normal !important;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}
</style>