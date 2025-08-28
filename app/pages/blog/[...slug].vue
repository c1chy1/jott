<template>
  <UPage class="m-0 p-0 bg-(--color-jm-secondary-white)">
    <UPageBody
        class="prose-h1:uppercase prose-h1:py-4 prose-h1:text-2xl prose-p:leading-7  prose-headings:uppercase prose-lead:uppercase prose-lead:text-base"
        prose>
      <UContainer class="max-w-(--container-2xl) text-center">

        <NuxtLink class="inline-block no-underline border-0" to="/">
          <Image :parallax="false" :shine="false" alt="JOTT.MEDIA GmbH" class="w-[325px] mt-2" src="logo.svg"/>
        </NuxtLink>

      </UContainer>
      <UContainer class="max-w-(--container-2xl)">
        <UPageHeader class="text-2xl sm:text-3xl xl:text-5xl xl:leading-14" v-html="article?.title"/>
        <!--        <div class="flex gap-2 mt-12 mb-2">
                  <UBadge v-for="category in article?.meta.categories"
                          :key="category"
                          :label="category"
                          class="px-2 text-xs text-(&#45;&#45;color-jm-secondary-white) bg-(&#45;&#45;color-jm-primary-green) font-extrabold"
                          color="primary"
                          size="xs"
                          variant="solid"/>
                </div>-->
        <small>{{ article?.meta?.date }} von
          <NuxtLink :to="`/team/${(article?.meta?.author as string)?.toLowerCase()}`"><b
              class="text-(--color-jm-primary-green) ">{{ article?.meta?.author }}
          </b></NuxtLink>
        </small>
        <p class="lead pt-6">{{ article?.description }}</p>
      </UContainer>
      <UContainer class="max-w-(--container-4xl)">
        <Image :alt="article?.meta?.imageAlt as string | undefined"
               :hint="article?.meta?.imageAlt as string | undefined"
               :public-src="true"
               :src="article?.meta?.image as string"/>
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
  layout: 'minimal'
});

const articleStore = useArticleStore()
const route = useRoute()

console.log('Current route path:', route.path)

onMounted(() => {
  articleStore.fetchCategories()
})
await articleStore.fetchArticle(route.path)

const article = computed(() => articleStore.article)

console.log('Person from store:', article.value)
</script>