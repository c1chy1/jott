<template>
  <UApp>
    <UMain
        :class="{'cursor-down': isMouseDown, 'cursor-show': isMouseShow}"
        :style="{ '--mouse-x': cursorX + 'px', '--mouse-y': cursorY + 'px' }"
        class="custom-cursor overflow-x-hidden scroll-smooth relative"
    >
      <div
          ref="overlayRef"
          :style="{ opacity: overlayVisible ? 1 : 0 }"
          class="fixed inset-0 bg-black z-[9999] pointer-events-none"
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

const cursorX = ref(0);
const cursorY = ref(0);
const isMouseDown = ref(false);
const isMouseShow = ref(true);
const overlayRef = ref<HTMLElement | null>(null);
const overlayVisible = ref(true);
const contentVisible = ref(false);

const updateCursorPosition = (e: MouseEvent) => {
  isMouseShow.value = true;
  cursorX.value = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
  cursorY.value = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
};

const updateCursorDown = (e: MouseEvent) => {
  isMouseDown.value = true;
};

const updateCursorUp = (e: MouseEvent) => {
  isMouseDown.value = false;
};

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

function addCursorEventListeners() {
  window.addEventListener('mousedown', updateCursorDown);
  window.addEventListener('mouseup', updateCursorUp);
  window.addEventListener('mousemove', updateCursorPosition);
}

function removeCursorEventListeners() {
  window.removeEventListener('mousedown', updateCursorDown);
  window.removeEventListener('mouseup', updateCursorUp);
  window.removeEventListener('mousemove', updateCursorPosition);
}

onMounted(initializeOverlayAnimation);
onMounted(addCursorEventListeners);
onUnmounted(removeCursorEventListeners);
</script>