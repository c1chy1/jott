
<template>
  <UApp>
    <UMain
        :class="{'cursor-down': isMouseDown, 'cursor-show': isMouseShow}"
        :style="{ '--mouse-x': cursorX + 'px', '--mouse-y': cursorY + 'px' }"
        class="custom-cursor overflow-x-hidden scroll-smooth"
    >
      <Transition
          mode="out-in"
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
      >
        <div :key="$route.fullPath">
          <NuxtLayout>
            <NuxtPage/>
          </NuxtLayout>
        </div>
      </Transition>
    </UMain>
  </UApp>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'

const route = useRoute()
const cursorX = ref(0);
const cursorY = ref(0);
const isMouseDown = ref(false);
const isMouseShow = ref(true);

const beforeEnter = (el: Element) => {
  console.log('beforeEnter called') // Debug
  gsap.set(el, { opacity: 0, y: 30 })
}

const enter = (el: Element, done: () => void) => {
  console.log('enter called') // Debug
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: done
  })
}

const leave = (el: Element, done: () => void) => {
  console.log('leave called') // Debug
  gsap.to(el, {
    opacity: 0,
    y: -30,
    duration: 0.4,
    ease: "power2.in",
    onComplete: done
  })
}

// ... existing code ...
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

onMounted(() => {
  window.addEventListener('mousedown', updateCursorDown);
  window.addEventListener('mouseup', updateCursorUp);
  window.addEventListener('mousemove', updateCursorPosition);
});

onUnmounted(() => {
  window.removeEventListener('mousedown', updateCursorDown);
  window.removeEventListener('mouseup', updateCursorUp);
  window.removeEventListener('mousemove', updateCursorPosition);
});
</script>

<style>
/* ... existing styles ... */

/* Usuń lub zakomentuj CSS przejścia */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>