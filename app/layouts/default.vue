<template>
  <Menu/>
  <slot/>
  <UFooter class="z-10 py-0 ">
    <template #top>
      <UContainer class="py-0 max-w-(--container-2xl) ">
        <div class="flex justify-between items-end py-0 ">
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
            <nuxt-link
                class="block font-[800] text-(--color-jm-primary-green) uppercase"
                to="/imprint">.Impressum
            </nuxt-link>
            <nuxt-link
                class="block font-[800] text-(--color-jm-primary-green) uppercase"
                to="/privacy">.Datenschutz
            </nuxt-link>
          </div>
        </div>
      </UContainer>
    </template>
    <template #right>
      <NuxtImg
          alt="Footer Bottom"
          class="absolute pointer-events-none object-contain w-72 bottom-17.5 right-0 z-1 "
          format="webp"
          src="/images/footer-box.png"
      />
    </template>
    <template #bottom>
      <div class=" bg-(--color-jm-primary-green) text-xl py-6 flex items-center justify-center z-2">
        <UContainer class="max-w-(--container-2xl) ">
          <p>© {{ new Date().getFullYear() }} JOTT.MEDIA – Alle Rechte vorbehalten</p>
        </UContainer>
      </div>
    </template>
    <template #left>
      <div class="absolute left-0 bottom-14 w-full h-full bg-(--color-jm-secondary-grey-lighter) -z-20"></div>
      <div
          ref="footerTop"
          class="absolute pointer-events-none left-1/2 bg-repeat-x -translate-x-1/2 w-screen h-[35rem] bottom-0 -z-0 bg-center bg-footer-top"
      />

    </template>
  </UFooter>
</template>
<script lang="ts" setup>
import { gsap } from 'gsap'


const footerTop = ref<HTMLElement | null>(null)

const setupParallax = (): void => {
  if (footerTop.value) {
    gsap.fromTo(
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
  }}
onMounted(() => {
  setTimeout(() => {
    setupParallax()
  }, 500)
})

</script>