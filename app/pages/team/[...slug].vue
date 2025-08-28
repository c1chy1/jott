<template>
  <UPage>
    <UPageBody class="mt-0 pb-0 h-screen">
      <UContainer
          class="gap-0 px-0 sm:px-0 lg:px-0 flex flex-col sm:flex-row sm:h-screen max-w-(--container-full) ">
        <div class="sm:w-1/2 h-1/2 sm:h-full">
          <NuxtImg
              :alt="person?.meta.imageAlt || person?.meta.name"
              :src="person?.meta.src"
              class="w-full h-full"
              format="webp"/>
        </div>
        <div
            :class="`bg-(--color-${person?.meta.bg})`"
            class="sm:w-1/2 h-1/2 sm:h-full flex flex-col justify-center px-4 space-y-4 lg:px-6 lg:space-y-6 xl:space-y-8 xl:px-8 2xl:space-y-12 2xl:px-20">
          <button
              class="w-12 h-12 bg-black/70 hover:bg-black/100 flex justify-center items-center rounded-full absolute right-12 bottom-0 transition-all z-50"
              @click="$router.back()">
            <UIcon class="text-lg sm:text-3xl text-(--color-jm-primary-brown) transition-all z-50"
                   name="i-mdi-close-thick"/>
          </button>
          <h1 class="text-lg uppercase font-extrabold" v-html="person?.meta.name"/>
          <p class="font-light text-base!"> {{ person?.seo.description }}</p>
          <UContainer class="relative pt-0 z-10 text-center">
            <NuxtLink href="https://calendar.app.google/rBDjAnPNYEQpfMvJ9" target="_blank">
              <button
                  :class="['border-2 rounded', 'text-xs lg:text-base px-4 py-2 uppercase font-bold', person?.meta.button]">
                Lerne uns kennen
              </button>
            </NuxtLink>
          </UContainer>
        </div>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script lang="ts" setup>
import {useTeamStore} from '~/stores/teamStore'

definePageMeta({
  layout: 'minimal'
});

const teamStore = useTeamStore()
const route = useRoute()

console.log('Current route path:', route.path)

await teamStore.fetchPerson(route.path)

const person = computed(() => teamStore.person)

console.log('Person from store:', person.value)
</script>