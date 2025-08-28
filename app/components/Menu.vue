<template>
  <template>
    <div class="fixed flex flex-col justify-center -bottom-2 sm:bottom-0 right-4 sm:right-8 z-50">
      <button @click="open = !open"
              class="h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center bg-(--color-jm-contrast-black) transition-all duration-700 bg-opacity-70 hover:bg-opacity-100  rounded-full z-50">
        <UIcon v-if="!open" class="text-lg sm:text-2xl text-(--color-jm-primary-brown) transition-all z-50" name="i-mdi-menu"/>
        <UIcon v-else class="text-lg sm:text-2xl  text-(--color-jm-primary-brown) transition-all z-50" name="i-mdi-close-thick"/>
      </button>
      <div class="relative py-3 mx-auto ">

          <transition name="page" mode="in-out">
            <div
                v-if="open"
                class="top-0 left-0 w-screen h-screen flex flex-col justify-start  z-30 bg-(--color-jm-primary-brown) fixed">
              <UContainer class="my-8" >

                  <NuxtLink to="/" @click="open = false" class="inline-block no-underline w-full mt-2 sm:w-[325px] border-0">
                    <Image src="logo-overlay.svg" alt="JOTT.MEDIA GmbH" class="w-full" :shine="false"
                           :parallax="false"/>
                  </NuxtLink>

              </UContainer>

              <UContainer class="sm:mt-12 flex flex-col sm:flex-row w-full justify-around space-x-2 sm:space-x-4">
                <ul class="uppercase font-extrabold text-left text-xl xl:text-3xl space-y-4 sm:space-y-8 text-(--color-jm-contrast-black)">
                  <li>
                    <NuxtLink @click="open = false" to="/">.Startseite</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink @click="open = false" to="/blog">.Blog</NuxtLink>
                  </li>
                </ul>
                <div class="text-left sm:text-right mt-8 sm:mt-0">
                  <nuxt-link to="/privacy" @click="open = false" class="block font-extrabold text-sm sm:text-base">
                    Datenschutz
                  </nuxt-link>
                  <nuxt-link to="/imprint" @click="open = false" class="block font-extrabold text-sm sm:text-base">
                    Impressum
                  </nuxt-link>
                  <address class="not-italic text-sm  mt-6 sm:mt-16">
                    JOTT.MEDIA GmbH<br>
                    Bahnhofstraße 33<br>
                    31675 Bückeburg<br>
                    <br>
                    <nuxt-link href="tel:+4957229184984">+49 5722 9184984</nuxt-link>
                    <br>
                    <nuxt-link href="mailto:hallo@jott.media">hallo@jott.media</nuxt-link>
                    <br>
                    <br>
                    <div class="text-left sm:text-right flex sm:justify-end items-center space-x-1">
                      <p class="pr-2">Folge uns:</p>
                      <NuxtLink href="https://www.instagram.com/jott.media/" target="_blank"
                                class="inline-block no-underline border-0">
                        <UIcon class="text-[#1E1E1E] text-2xl block " name="i-mdi-instagram"/>
                      </NuxtLink>
                      <NuxtLink href="https://de.linkedin.com/company/jottmedia" target="_blank"
                                class="inline-block no-underline border-0">
                        <UIcon class="text-[#1E1E1E] text-2xl block" name="i-mdi-linkedin"/>
                      </NuxtLink>
                    </div>
                  </address>
                </div>
              </UContainer>
            </div>
          </transition>
      </div>
    </div>
  </template>

</template>

<script lang="ts" setup>
const open = ref(false)
</script>