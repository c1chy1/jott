<template>
  <UPage class="m-0 p-0 bg-(--color-jm-secondary-white)">
    <UPageBody
        class="prose-h1:uppercase prose-h1:py-4 prose-h1:text-2xl prose-p:leading-7  prose-headings:uppercase prose-lead:uppercase prose-lead:text-base"
        prose>
      <UContainer class="max-w-(--container-2xl) text-center">
        <NuxtLink :to="localePath('/')" class="inline-block no-underline border-0">
          <Image :parallax="false" :shine="false" alt="JOTT.MEDIA GmbH" class="w-[325px] mt-2" src="logo.svg"/>
        </NuxtLink>
      </UContainer>

      <UContainer class="max-w-(--container-2xl)">
        <UPageHeader class="text-2xl sm:text-3xl xl:text-5xl xl:leading-14" v-html="article?.title"/>
        <div class="flex flex-col">
          <div class="flex space-x-4 py-2">
            <UBadge
                v-for="(category, index) in (article.meta.categories as unknown[])"
                :key="index"
                class="text-xs flex justify-center text-(--color-jm-secondary-white) w-24 bg-(--color-jm-primary-brown) font-extrabold uppercase"
                color="primary"
                size="xs"
                variant="solid">{{ category }}
            </UBadge>
          </div>
          <small>{{ article?.date }} von
            <NuxtLink :to="localePath(`/team/${article?.meta?.author?.toLowerCase()}`)">
              <b class="text-(--color-jm-primary-green)">{{ article?.meta?.author }}</b>
            </NuxtLink>
          </small>
        </div>

        <p class="lead pt-6">{{ article?.description }}</p>
      </UContainer>

      <UContainer class="max-w-(--container-4xl)">
        <Image
            :alt="article?.meta?.imageAlt as string | undefined"
            :hint="article?.meta?.imageAlt as string | undefined"
            :public-src="true"
            :src="article?.meta?.image as string"
            loading="lazy"
        />
      </UContainer>

      <UContainer class="pb-10 max-w-(--container-2xl)">
        <ContentRenderer v-if="article?.body" :value="article"/>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script lang="ts" setup>
import {useArticleStore} from '~/stores/articleStore'

definePageMeta({
  layout: 'default'
});

const articleStore = useArticleStore()
const route = useRoute()
const localePath = useLocalePath()
const {slug} = route.params

await articleStore.fetchArticle(slug as string)

const article = computed(() => articleStore.article)

useHead({
  title: () => article.value?.title ? `${article.value.title} - Blog - JOTT.MEDIA` : 'Blog - JOTT.MEDIA',
  meta: [
    {
      name: 'description',
      content: () => article.value?.description || 'Blog article'
    }
  ]
})

useSeoMeta({
  title: () => article.value?.meta?.seoTitle ? `${article.value.meta.seoTitle} - Blog - JOTT.MEDIA` : `${article.value?.title} - Blog - JOTT.MEDIA`,
  ogTitle: () => article.value?.meta?.seoTitle ? `${article.value.meta.seoTitle} - Blog - JOTT.MEDIA` : `${article.value?.title} - Blog - JOTT.MEDIA`,
  description: () => article.value?.description,
  ogDescription: () => article.value?.description,
  ogImage: () => article.value?.meta?.image ? `https://jott.media${article.value.meta.image}` : undefined,
  twitterCard: 'summary_large_image',
})
</script>