<template>
  <UPageBody class="text-center bg-(--color-jm-secondary-white) mt-0">
    <div class="mb-0 bg-(--color-jm-secondary-grey-lighter) overflow-hidden relative">
      <NuxtImg
          ref="headerBox"
          alt="Header Box"
          class="absolute bottom-0 -left-1/12 pointer-events-none object-cover z-[2]"
          fetchpriority="high"
          format="webp"
          height="1100"
          loading="eager"
          src="/images/header-box.png"
          width="760"
      />

      <UPageHero
          class="py-4 relative z-10 h-screen"
          orientation="vertical"
      >
        <template #top>
          <div
              ref="headerGreenTop"
              class="absolute pointer-events-none w-screen h-[32rem] bottom-0 -z-[1] bg-header-green-top"
          />
          <div
              ref="headerGrey"
              class="absolute pointer-events-none w-screen h-[35rem] bottom-0 -z-[2] bg-header-grey"
          />
          <NuxtLink :to="localePath('/')"
                    class="inline-block no-underline w-full mt-6 sm:w-[325px] border-0"
          >
            <Image :parallax="false" :shine="false" alt="JOTT.MEDIA GmbH" class="w-full"
                   src="logo.svg"/>
          </NuxtLink>
        </template>
        <template #headline>
          <h5 class="animated-bold text-6xl mt-4">
            {{ t('make.we') }}<br>
            <span class="text-(--color-nuxt-ui-primary-50) uppercase">
              {{ t('make.simple') }}</span>
            <b class="uppercase"> digital</b>.
          </h5>
        </template>
        <template #body>
          <UButton
              :label="t('makeSimpleButton')"
              :to="{ path: '/', hash: '#machen' }"
              class="mb-10 mt-4 hover:bg-(--color-jm-primary-brown)/75 hover:text-(--ui-bg) hover:border-(--color-jm-primary-brown)"
              color="secondary"
              outline="false"
              size="lg"
              variant="outline"
          />
        </template>
        <template #footer>
          <div>
            <h2 class="animated-bold uppercase text-2xl xl:text-3xl mt-8 mb-3">
              {{ t('office.your') }}
              <span class="lowercase">
                       {{ t('office.for') }}
              </span>
              <b>{{ t('office.development') }}</b>
            </h2>
            <NuxtLink
                :to="{ path: '/', hash: '#machen' }"
                @click="scrollTo"
            >
              <UIcon
                  class="text-(--color-jm-secondary-grey) text-[60px]"
                  name="cil:arrow-thick-bottom"
              />
            </NuxtLink>
          </div>
        </template>
      </UPageHero>
    </div>

    <div class="bg-(--color-jm-primary-green)  leading-0 text-xl text-left relative overflow-hidden my-0">
      <UContainer
          id="machen"
          class="min-h-[400px] z-10 pt-8 leading-0 uppercase"
      >
        <h6 class="text-sm normal-case">
          {{ t('get.what') }}
          <b class="uppercase font-bold">
            {{ t('get.fromUs') }}</b>
        </h6>
        <h3>
          <b>
            {{ t('get.time') }}
          </b> {{ t('get.energy') }}
          <b> {{ t('get.success') }}</b>
          {{ t('get.growth') }}
          <b> {{ t('get.efficiency') }}</b>
          {{ t('get.business') }}
        </h3>
      </UContainer>
    </div>
    <div
        ref="headerGreenBottom"
        class="absolute pointer-events-none w-screen h-[43rem] bg-repeat-x z-[4] bg-center bg-header-green-bottom"
    />
    <UContainer class="max-w-(--container-4xl) relative py-10 z-10">
      <Image
          alt="Arian und Jan im Termin"
          loading="lazy"
          src="team.jpg"
      />
    </UContainer>

    <UContainer class="xl:max-w-(--container-2xl) w-2/3 mx-0 lg:mx-auto text-left relative py-10">
      <h6 class="animated-bold animation-h1 text-sm">
        {{ t('question.important') }}<b class="uppercase">Frage</b>
      </h6>
      <h2 class="font-bold text-4xl pt-8">
        „<b class="uppercase">
        {{ t('question.what') }}
      </b>
        <span class="font-light"> {{ t('question.exactly') }} </span>
        <b class="uppercase">
          {{ t('question.need') }}</b>"
      </h2>
    </UContainer>

    <UContainer class="max-w-(--container-2xl) relative pt-4 text-left">
      <h6> {{ t('work.we') }}<b class="uppercase"> {{ t('work.forYou') }}</b></h6>
      <h4 class="text-(--color-jm-primary-brown) text-xl py-4 uppercase font-bold">
        <b>{{ t('work.honesty') }}</b>
      </h4>
      <Paragraph class="text-base">
        {{ t('solution.problem') }}
        <b>
          {{ t('solution.solution') }}
        </b> <b>{{ t('solution.priority') }}</b>
        {{ t('solution.analyze') }}
        <b>{{ t('solution.conception') }}</b>
        {{ t('solution.products') }}
        <b> {{ t('solution.equal') }}</b>
        {{ t('solution.sides') }}
      </Paragraph>
    </UContainer>

    <UButton
        :label="t('startButton')"
        class="hover:bg-(--color-jm-primary-brown)/75 hover:text-(--ui-bg) hover:border-(--color-jm-primary-brown)"
        color="secondary"
        outline="true"
        size="lg"
        target="_blank"
        to="https://calendar.app.google/rBDjAnPNYEQpfMvJ9"
        variant="outline"
    />

    <!-- Team Section - Pinia powered -->
    <UContainer class="max-w-(--container-4xl) relative xl:pt-4 z-10 text-left">
      <div class="mt-16">
        <UBlogPosts class="!flex !gap-y-0">
          <div
              v-for="(person, index) in teamStore.team"
              :key="index"
              :class="[
              'flex',
              (person as any).meta?.align === 'right' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div class="md:w-2/5 relative">
              <UBlogPost
                  :key="index"
                  :to="localePath(`/team/${(person as any).slug || (person as any).meta?.name?.toLowerCase()}`)"
                  class="text-left ring-0 overflow-visible h-[416px] relative"
              >
                <template #header>
                  <NuxtImg
                      :alt="(person as any).meta?.imageAlt || (person as any).meta?.name"
                      :aspect-ratio="16/9"
                      :height="416"
                      :src="(person as any).meta?.src"
                      :width="416"
                      class="w-full h-full block m-0 cover bg-center"
                      format="webp"
                      loading="lazy"
                  />
                </template>
                <template #badge>
                  <NuxtLink
                      :to="localePath(`/team/${(person as any).slug || (person as any).meta?.name?.toLowerCase()}`)"
                      class="p-0"
                  >
                    <button
                        class="w-12 h-12 bg-black/90 flex justify-center items-center rounded-full absolute sm:-right-6 top-0 sm:top-auto sm:-bottom-6 transition-opacity duration-300 z-10 opacity-80 hover:opacity-100"
                    >
                      <UIcon
                          class="text-2xl h-9 w-9 text-(--color-jm-primary-brown) cursor-pointer"
                          name="i-mdi-plus"
                      />
                    </button>
                  </NuxtLink>
                </template>
              </UBlogPost>

              <div class="md:absolute">
                <h5
                    class="text-lg uppercase h-animation-bigger pt-4"
                    v-html="(person as any).meta?.quote"
                />
                <Paragraph
                    v-if="(person as any).meta?.hint"
                    class="italic text-sm mb-0 pt-2"
                >
                  {{ (person as any).meta?.hint }}
                </Paragraph>
              </div>
            </div>
          </div>
          <div
              ref="greyTop"
              class="absolute pointer-events-none w-screen h-[44rem]  bg-repeat-x left-1/2 -translate-x-1/2 -z-1 bg-center bg-grey-top"
          />
          <div
              ref="greyBottom"
              class="absolute pointer-events-none w-screen h-[44rem] bottom-1/6  bg-repeat-x left-1/2 -translate-x-1/2 -z-1 bg-center bg-grey-bottom"
          />
        </UBlogPosts>
      </div>
    </UContainer>

    <UContainer class="max-w-(--container-2xl) relative xl:pt-4 mb-32 z-10">
      <UButton
          :label="t('knowButton')"
          class="mb-10 mt-40 hover:bg-(--color-jm-primary-brown)/75 hover:text-(--ui-bg) hover:border-(--color-jm-primary-brown)"
          color="secondary"
          outline="true"
          size="lg"
          target="_blank"
          to="https://calendar.app.google/rBDjAnPNYEQpfMvJ9"
          variant="outline"
      />
    </UContainer>

    <div class="bg-(--color-jm-primary-green)">
      <UContainer class="max-w-(--container-2xl) h-[13rem] relative text-left pt-4 z-10">
        <h6> {{ t('we.do') }}<b class="uppercase"> {{ t('we.forYou') }}</b></h6>
        <h2 class="font-[400] uppercase text-3xl pt-4">
          {{ t('we.development') }}
          <b class="text-(--color-jm-primary-brown)">
            {{ t('we.digital') }}</b>
          <b>{{ t('we.customise') }}</b>
        </h2>
        <div
            ref="greenTop"
            class="absolute pointer-events-none w-screen h-[48rem] bg-repeat-x bottom-1/4 left-1/2 -translate-x-1/2 -z-1 bg-center bg-green-top"
        />
        <div
            ref="greenBottom"
            class="absolute pointer-events-none w-screen h-[48rem] top-1/12 bg-repeat-x left-1/2 -translate-x-1/2 -z-1  bg-center bg-green-bottom"
        />
      </UContainer>
    </div>

    <!-- Lazy load carousel - below the fold -->
    <Suspense>
      <UContainer class="max-w-(--container-4xl) py-10">
        <LazyCarousel :items="carouselItems"/>
      </UContainer>
      <template #fallback>
        <div class="max-w-(--container-4xl) py-10 mx-auto">
          <div class="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </template>
    </Suspense>

    <UContainer class="max-w-(--container-2xl) pt-6 text-left z-10">
      <Paragraph>
        <b class="text-(--color-jm-primary-brown) uppercase">
          {{ t('challenges.conception') }}
        </b> {{ t('challenges.of') }}
        <b>{{ t('challenges.digital') }}</b>
        {{ t('challenges.challenge') }}
        <b>{{ t('challenges.master') }}</b>
        {{ t('challenges.other') }}<b>
        {{ t('challenges.complicated') }}
      </b> {{ t('challenges.obstacles') }}<b>
        {{ t('challenges.website') }}</b>
        {{ t('challenges.solutions') }}<b>
        {{ t('challenges.aesthetics') }}
      </b>
        {{ t('challenges.start') }}
      </Paragraph>
    </UContainer>

    <UButton
        :label=" t('goButton') "
        class="hover:bg-(--color-jm-primary-brown)/75 hover:text-(--ui-bg) hover:border-(--color-jm-primary-brown)"
        color="secondary"
        outline="true"
        size="lg"
        target="_blank"
        to="https://calendar.app.google/rBDjAnPNYEQpfMvJ9"
        variant="outline"
    />

    <!-- Articles Section - Pinia powered with lazy loading -->
    <Suspense>
      <UContainer class="max-w-(--container-5xl) py-20">
        <h2 class="pb-8 leading-9 xl:leading-5 text-3xl xl:text-4xl lowercase">
          <b class="text-(--color-jm-primary-brown) uppercase">{{ t('world.new') }}</b> {{ t('world.from') }}
          <b class="text-(--color-jm-primary-brown) uppercase"> {{ t('world.digital') }} </b>
        </h2>

        <UBlogPosts class="mt-10 gap-y-8 grid-cols-1! lg:grid-cols-2! 2xl:grid-cols-3!" orientation="horizontal">
          <UBlogPost
              v-for="(article, index) in latestArticles"
              :key="index"
              :image="{ src: article.meta?.image, width: 418, height: 418, format: 'webp', aspectRatio: 'cover' }"
              :to="localePath(`/blog/${article.slug}`)"
              class="text-left ring-0"
          >
            <template #title>
              <div v-html="article.title"/>
            </template>
            <template #date>
              <NuxtLink
                  :to="localePath(`/team/${article.meta?.author?.toLowerCase()}`)"
                  class="text-(--color-jm-primary-green) font-extrabold z-10"
              >
                {{ article.meta?.author }}
              </NuxtLink>
            </template>
            <template #description>
              <div/>
            </template>
            <template #badge>
              <p class="text-sm font-light">
                {{ article.date }} von
              </p>
            </template>
            <template #authors>
              <UBadge
                  v-for="(category, categoryIndex) in (article.meta?.categories as string[])?.slice(0, 2)"
                  :key="categoryIndex"
                  class="px-2 text-xs text-(--color-jm-secondary-white) bg-(--color-jm-primary-brown) font-extrabold uppercase"
                  color="primary"
                  size="xs"
                  variant="solid"
              >
                {{ category }}
              </UBadge>
            </template>
          </UBlogPost>
        </UBlogPosts>

        <UButton
            :label="t('blogButton')"
            :to="localePath('/blog')"
            class="mt-8 hover:bg-(--color-jm-primary-brown)/75 hover:text-(--ui-bg) hover:border-(--color-jm-primary-brown)"
            color="secondary"
            outline="true"
            size="lg"
            variant="outline"
        />
      </UContainer>

      <template #fallback>
        <div class="max-w-(--container-5xl) py-20 mx-auto">
          <div class="space-y-4">
            <div class="h-8 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
            <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mt-10">
              <div v-for="i in 3" :key="i" class="h-96 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </template>
    </Suspense>
  </UPageBody>
</template>

<script lang="ts" setup>
import {useTeamStore} from '~/stores/teamStore'
import {useArticleStore} from '~/stores/articleStore'
import {gsap} from 'gsap'

const localePath = useLocalePath()
const {t, locale} = useI18n()

// SEO & Meta
useHead({
  title: () => locale.value === 'de' ? 'Dein Büro für Entwicklung und Design – JOTT.MEDIA' : 'Your Office for Development and Design – JOTT.MEDIA'
})

// Lazy load components for below-the-fold content
const LazyCarousel = defineAsyncComponent(() => import('~/components/Carousel.vue'))

const teamStore = useTeamStore()
const articleStore = useArticleStore()

// Refs for parallax
const headerGrey = ref<HTMLElement | null>(null)
const headerGreenTop = ref<HTMLElement | null>(null)
const headerGreenBottom = ref<HTMLElement | null>(null)
const greyTop = ref<HTMLElement | null>(null)
const greyBottom = ref<HTMLElement | null>(null)
const greenTop = ref<HTMLElement | null>(null)
const greenBottom = ref<HTMLElement | null>(null)

// ABOVE-THE-FOLD: Team data - SSR with Pinia cache
await teamStore.fetchTeam()

// BELOW-THE-FOLD: Latest articles - lazy loaded with Pinia cache
const latestArticles = await articleStore.fetchLatestArticles()

// Carousel items
const carouselItems = ref([
  {
    id: '1',
    src: '1-team-arian-annika.jpg',
    alt: 'Arian und Annika spielen Klask',
  },
  {
    id: '2',
    src: '2-team-jonathan-jan.jpg',
    alt: 'Jan und Jonathan sind im Termin',
  },
  {
    id: '3',
    src: '3-iphone-cd.jpg',
    alt: 'Wir erstellen ein Bild von unserem iPhone',
  },
  {
    id: '4',
    src: '4-klask.jpg',
    alt: 'Ein Klask-Match',
  },
  {
    id: '5',
    src: '5-work.jpg',
    alt: 'Wir sind bei der Arbeit',
  },
])

// Parallax setup - optimized with requestIdleCallback
const setupParallax = (): void => {
  if (typeof window === 'undefined') return

  const elements = [
    {ref: headerGrey, config: {from: '0px', to: '300px', scrub: 1.5}},
    {ref: headerGreenTop, config: {from: '0', to: '-300px', scrub: 1.8}},
    {ref: headerGreenBottom, config: {from: '0', to: '400px', scrub: 1.6}},
    {ref: greyTop, config: {from: '0', to: '-380px', scrub: 1.4}},
    {ref: greyBottom, config: {from: '0', to: '320px', scrub: 1.7}},
    {ref: greenTop, config: {from: '0', to: '-260px', scrub: 1.5}},
    {ref: greenBottom, config: {from: '-200px', to: '290px', scrub: 1.3}}
  ]

  elements.forEach(({ref, config}) => {
    if (ref.value) {
      gsap.fromTo(
          ref.value,
          {backgroundPositionX: config.from},
          {
            backgroundPositionX: config.to,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.value,
              start: 'top bottom',
              end: 'bottom top',
              scrub: config.scrub,
            },
          }
      )
    }
  })
}

// Smooth scroll function
function scrollTo(event: Event): void {
  event.preventDefault()
  const target = document.getElementById('machen')
  if (target) {
    target.scrollIntoView({behavior: 'smooth'})
  }
}

// Initialize parallax after mount with performance optimization
function initializeParallax() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => setupParallax(), {timeout: 1000})
  } else {
    setTimeout(setupParallax, 500)
  }
}

onMounted(initializeParallax)
</script>