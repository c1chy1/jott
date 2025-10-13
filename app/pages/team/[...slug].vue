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
            :class="person?.meta.bg"
            class="relative sm:w-1/2 h-1/2 sm:h-full flex flex-col justify-center px-4 py-4 space-y-4 lg:px-6 lg:space-y-6 xl:space-y-8 xl:px-8 2xl:space-y-12 2xl:px-20">
          <NuxtLink
              :to="localePath('/')"
              class="absolute  right-2 sm:right-3 2xl:right-8 bottom-0 xl:-bottom-2 2xl:-bottom-8 h-10 w-10 sm:h-12 sm:w-12 2xl:w-16 2xl:h-16 flex justify-center items-center rounded-full bg-black/90 transition-opacity duration-300 opacity-80 hover:opacity-100 z-50"
              @click="handleClick"
          >
            <UIcon class="text-lg sm:text-3xl text-(--color-jm-primary-brown) transition-all z-50"
                   name="i-mdi-close-thick"/>
          </NuxtLink>


          <h1 class="text-2xl sm:text-lg 2xl:text-4xl uppercase font-extrabold" v-html="person?.meta.name"/>
          <p class="xl:pt-8 xl:leading-normal font-extralight text-base sm:text-sm lg:text-base 2xl:text-xl"> {{
              person?.description
            }}</p>
          <UContainer class="relative pt-0 z-10 text-center">
            <NuxtLink href="https://calendar.app.google/rBDjAnPNYEQpfMvJ9" target="_blank">
              <UButton
                  :class="['border-3 rounded', 'text-xs sm:text-sm lg:text-base 2xl:text-xl px-4 py-2 sm:my-8 uppercase font-bold cursor-pointer hover:bg-(--color-jm-primary-brown)/75 hover:text-(--ui-bg) hover:border-(--color-jm-primary-brown)', person?.meta.button]">
                Lerne uns kennen
              </UButton>
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

const localePath = useLocalePath()
const teamStore = useTeamStore()
const route = useRoute()
const router = useRouter()

const {slug} = route.params;


const person = computed(() => teamStore.person)
onMounted(() => {
  teamStore.fetchPerson(slug)
})

const handleClick = async (event: Event) => {
  event.preventDefault()

  try {
    await navigateTo(localePath('/'))
  } catch (error) {
    console.error('Navigation failed, fallback to localePath')
    await router.push(localePath('/'))
  }
}


</script>



