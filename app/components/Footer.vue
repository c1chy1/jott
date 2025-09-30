<template>
  <UFooter class="z-10 py-0 pt-8 relative">
    <template #top>
      <UContainer class="py-0 text-sm xl:text-base max-w-(--container-full)">
        <div class="flex justify-between lg:justify-evenly items-end py-0">
          <div>
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
                      class="block font-[800] text-(--color-jm-primary-green) uppercase"
            >.{{ t('privacy') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/imprint')"
                      class="block font-[800] text-(--color-jm-primary-green) uppercase"
            >.{{ t('imprint') }}
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </template>
    <template #right>
      <NuxtImg
          alt="Footer Bottom"
          class="absolute pointer-events-none object-contain w-36 sm:w-72 bottom-10 right-0 -z-1"
          format="webp"
          src="/images/footer-box.png"
      />
    </template>
    <template #bottom>

      <div
          class="bg-(--color-jm-primary-green) py-6  z-2  pl-2 sm:pl-4 text-xs sm:text-sm">
        <p class="w-11/12 sm:w-full">© {{ new Date().getFullYear() }} JOTT.MEDIA – {{ t('AllRightsReserved') }}</p>
      </div>

    </template>
    <template #left>
      <div class="absolute left-0 bottom-0 w-full h-[24rem] bg-(--color-jm-secondary-grey-lighter) -z-20"></div>
      <div
          ref="footerTop"
          class="absolute pointer-events-none left-1/2 bg-repeat-x -translate-x-1/2 w-screen h-[52rem] bottom-0 -z-0 bg-center bg-footer-top"
      />
    </template>
  </UFooter>
</template>
<script lang="ts" setup>

const localePath = useLocalePath()
const {t} = useI18n()
const {$gsap} = useNuxtApp()
const footerTop = ref<HTMLElement | null>(null)

const setupParallax = (): void => {
  if (!process.client || !footerTop.value || !$gsap) return

  $gsap.fromTo(
      footerTop.value,
      {backgroundPositionX: '0px'},
      {
        backgroundPositionX: '-300px',
        ease: 'none',
        scrollTrigger: {
          trigger: footerTop.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      }
  )
}

function initializeParallax() {
  if (!process.client) return

  nextTick(() => {
    setTimeout(() => {
      setupParallax()
    }, 500)
  })
}

onUnmounted(() => {
  if (process.client && $gsap?.ScrollTrigger) {
    const triggers = $gsap.ScrollTrigger.getAll()
    triggers.forEach(trigger => {
      if (trigger.trigger === footerTop.value) {
        trigger.kill()
      }
    })
  }
})

onMounted(initializeParallax)
</script>
