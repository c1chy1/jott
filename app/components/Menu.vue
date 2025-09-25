<template>
  <div class="fixed flex flex-col justify-center -bottom-3 sm:bottom-2 right-12 sm:right-8 z-50 ">
    <UButton
        class="absolute sm:right-6 bottom-6 h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center  bg-black/75 hover:bg-black/75 transition-opacity duration-300 opacity-80 hover:opacity-100  rounded-full z-50 cursor-pointer"
        variant="ghost"
        @click="toggleMenu">
      <UIcon v-if="!open" class="text-lg sm:text-2xl text-(--color-jm-primary-brown) transition-all z-50"
             name="i-mdi-menu"/>
      <UIcon v-else class="text-lg sm:text-2xl  text-(--color-jm-primary-brown) transition-all z-50"
             name="i-mdi-close-thick"/>
    </UButton>
    <div class="relative py-3 mx-auto ">
      <div
          v-if="open"
          ref="menuBackgroundRef"
          class="top-0 left-0 w-screen h-screen flex flex-col justify-start z-30 bg-(--color-jm-primary-brown) fixed">
        <UContainer class="my-5 flex justify-center">
          <NuxtLink :to="localePath({path: '/'})"
                    class="inline-block no-underline w-64 mt-0 sm:w-[325px] border-0"
                    @click="closeMenu">
            <Image ref="logoRef" :parallax="false" :shine="false" alt="JOTT.MEDIA GmbH"
                   src="logo-overlay.svg"/>
          </NuxtLink>
        </UContainer>
        <UContainer class="sm:mt-12 flex flex-col sm:flex-row w-full justify-around  space-x-2 sm:space-x-4">

          <div ref="leftSideRef" class="flex flex-col justify-between">
            <ul class="uppercase font-extrabold text-left text-xl xl:text-3xl space-y-4 sm:space-y-8 text-(--color-jm-contrast-black)">
              <li ref="homeRef">
                <NuxtLink :to="localePath({ name: 'index' })" @click="closeMenu">{{ t('menu.home') }}</NuxtLink>
              </li>
              <li ref="blogRef">
                <NuxtLink :to="localePath({name: 'blog'})" @click="closeMenu">{{ t('menu.blog') }}</NuxtLink>
              </li>
            </ul>
            <div ref="languageRef" class="mt-8 text-left">
              <UButton
                  :class="{ 'font-bold bg-(--color-jm-primary-green)': currentLocale === 'de' }"
                  class="mr-2 text-xs text-(--color-jm-contrast-black) hover:font-bold transition-all duration-200 cursor-pointer"
                  @click="handleLanguageChange('de')">
                DE
              </UButton>
              <span class="text-(--color-jm-contrast-black) text-lg">|</span>
              <UButton
                  :class="{ 'font-bold bg-(--color-jm-primary-green)': currentLocale === 'en' }"
                  class="ml-2 text-xs text-(--color-jm-contrast-black) hover:font-bold transition-all duration-200 cursor-pointer"
                  @click="handleLanguageChange('en')">
                EN
              </UButton>
            </div>
          </div>

          <div ref="rightSideRef" class="text-left sm:text-right mt-8 sm:mt-0">
            <div ref="legalLinksRef">
              <NuxtLink :to="localePath('/privacy')" class="block font-extrabold text-sm sm:text-base"
                        @click="closeMenu">
                .{{ t('privacy') }}
              </NuxtLink>
              <NuxtLink :to="localePath('/imprint')" class="block font-extrabold text-sm sm:text-base"
                        @click="closeMenu">
                .{{ t('imprint') }}
              </NuxtLink>
            </div>
            <address ref="addressRef" class="not-italic text-sm  mt-6 sm:mt-16">
              JOTT.MEDIA GmbH<br>
              Bahnhofstraße 33<br>
              31675 Bückeburg<br>
              <br>
              <NuxtLink href="tel:+4957229184984">+49 5722 9184984</NuxtLink>
              <br>
              <NuxtLink href="mailto:hallo@jott.media">hallo@jott.media</NuxtLink>
              <br>
              <br>
              <div ref="socialRef" class="text-left sm:text-right flex sm:justify-end items-center space-x-1">
                <p class="pr-2">{{ t('menu.follow') }}</p>
                <NuxtLink class="inline-block no-underline border-0" href="https://www.instagram.com/jott.media/"
                          target="_blank">
                  <UIcon class="text-[#1E1E1E] text-2xl block " name="i-mdi-instagram"/>
                </NuxtLink>
                <NuxtLink class="inline-block no-underline border-0" href="https://de.linkedin.com/company/jottmedia"
                          target="_blank">
                  <UIcon class="text-[#1E1E1E] text-2xl block" name="i-mdi-linkedin"/>
                </NuxtLink>
              </div>
            </address>
          </div>
        </UContainer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {gsap} from 'gsap'

const {t, locale, setLocale} = useI18n()
const localePath = useLocalePath()
const open = ref(false)
const currentLocale = computed(() => locale.value)
const {$animatedLanguageChange} = useNuxtApp()

const menuBackgroundRef = ref<HTMLElement>()
const logoRef = ref<HTMLElement>()
const leftSideRef = ref<HTMLElement>()
const rightSideRef = ref<HTMLElement>()
const homeRef = ref<HTMLElement>()
const blogRef = ref<HTMLElement>()
const languageRef = ref<HTMLElement>()
const legalLinksRef = ref<HTMLElement>()
const addressRef = ref<HTMLElement>()
const socialRef = ref<HTMLElement>()

const createMenuOpenAnimation = () => {
  const tl = gsap.timeline()


  const logoImg = logoRef.value?.$el || logoRef.value?.querySelector('img') || logoRef.value

  gsap.set(menuBackgroundRef.value, {opacity: 0})
  gsap.set(logoImg, {opacity: 0, y: -50, scale: 0.8})
  gsap.set([homeRef.value, blogRef.value, languageRef.value], {x: -100, opacity: 0})
  gsap.set([legalLinksRef.value, addressRef.value, socialRef.value], {x: 100, opacity: 0})

  tl.to(menuBackgroundRef.value, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  })

      .to(logoImg, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      }, 0.2)

      .to(homeRef.value, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.5)
      .to(blogRef.value, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.7)
      .to(languageRef.value, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.9)

      .to(legalLinksRef.value, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.5)
      .to(addressRef.value, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.7)
      .to(socialRef.value, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.9)

  return tl
}

const createMenuCloseAnimation = () => {
  const tl = gsap.timeline()


  const logoImg = logoRef.value?.$el || logoRef.value?.querySelector('img') || logoRef.value

  tl.to([socialRef.value], {
    x: 100,
    opacity: 0,
    duration: 0.5,
    ease: "power3.in"
  }, 0)
      .to([languageRef.value], {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      }, 0)

      .to([addressRef.value], {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      }, 0.1)
      .to([blogRef.value], {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      }, 0.1)

      .to([legalLinksRef.value], {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      }, 0.2)
      .to([homeRef.value], {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      }, 0.2)

      .to(logoImg, {
        y: 10,
        scale: 1.1,
        duration: 0.15,
        ease: "power2.out"
      }, 0.3)
      .to(logoImg, {
        opacity: 0,
        y: -60,
        scale: 0.7,
        duration: 0.5,
        ease: "power3.in"
      }, 0.45)

      .to(menuBackgroundRef.value, {
        opacity: 0,
        delay: 0.3,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          open.value = false
        }
      }, 0.7)

  return tl
}

const toggleMenu = async () => {
  if (!open.value) {
    open.value = true

    await nextTick()

    createMenuOpenAnimation()
  } else {
    createMenuCloseAnimation()
  }
}

const closeMenu = () => {
  if (open.value) {
    createMenuCloseAnimation()
  }
}

const handleLanguageChange = async (newLocale: string) => {
  if (currentLocale.value === newLocale) return

  await $animatedLanguageChange(setLocale, newLocale)
}
</script>