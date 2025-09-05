<template>
  <UPage class="m-0 p-0 bg-(--color-jm-secondary-white)">
    <UPageBody>
      <UContainer class="max-w-(--container-2xl) text-center">
        <NuxtLink class="inline-block no-underline border-0" to="/">
          <Image :parallax="false" :shine="false" alt="JOTT.MEDIA GmbH" class="w-[325px] mt-2" src="logo.svg"/>
        </NuxtLink>
      </UContainer>
      <UContainer class="pt-16 max-w-(--container-7xl)">
        <Headline class="pb-8 leading-8 lg:leading-5 text-4xl lowercase" type="h2">
          <b class="text-(--color-jm-primary-brown) uppercase">Neues</b> aus der
          <b class="text-(--color-jm-primary-brown) uppercase"> digitalen Welt </b>
        </Headline>
        <Paragraph class="text-sm lg:text-tiny mb-8">Hier möchten wir gerne unser Wissen, über die digitale Zukunft,
          Technologien, Design <br> und das Leben in einer digitalen Agentur, mit euch teilen, bleibt gespannt, wir sind
          es auch.
        </Paragraph>
        <UContainer class="max-w-(--container-6xl) px-0 sm:px-0 lg:px-0 space-x-4 space-y-4 ml-0">
          <UButton
              v-for="(category, index) in articleStore.categories"
              :key="index"
              :label="category"
              color="secondary"
              outline="true"
              size="lg"
              variant="outline"
              @click="articleStore.setSelectedCategory(category)"
          />
        </UContainer>

        <UBlogPosts orientation="horizontal">
          <transition-group class="contents" name="list" tag="ul">
            <UBlogPost
                v-for="(article, index) in articleStore.filteredArticles"
                :key="index"
                :authors="[{ name: article.meta.author as string , class: 'text-(--color-jm-primary-green)' }]"
                :image="{ src: article.meta.image, width: 480, height: 274, format: 'webp' , aspectRatio: 'cover' }"
                :to="localePath(`/blog/${article.slug}`)"
                as="li"
                class="bg-(--color-jm-secondary-grey-lighter)"
                v-bind="article">
              <template #title>
                <div class="py-2" v-html="article.title"></div>
              </template>
              <template #date>
                <NuxtLink :to="`/team/${article?.meta?.author?.toLowerCase()}`"
                          class="text-(--color-jm-primary-green) font-extrabold z-50">
                  {{ article.meta.author }}
                </NuxtLink>
              </template>
              <template #description>
                <p class="text-sm font-light">{{
                    articleStore.truncateText(article.seo.description as string, 250)
                  }}
                </p>
              </template>
              <template #badge>
                <p class="text-sm font-light">{{ article.meta.date as string | Date | undefined }} von</p>
              </template>
              <template #authors>
                <UBadge
                    v-for="(category, index) in (article.meta.categories as unknown[]).slice(1)"
                    :key="index"
                    class="px-2 text-xs text-(--color-jm-secondary-white) bg-(--color-jm-primary-brown) font-extrabold uppercase"
                    color="primary"
                    size="xs"
                    variant="solid">{{ category }}
                </UBadge>
              </template>

            </UBlogPost>
          </transition-group>
        </UBlogPosts>
        <div class="text-center mt-16 mb-32">
          <UButton
              :disabled="articleStore.articles?.length < articleStore.pageMaxArticles"
              :label="articleStore.loadMoreButtonLabel"
              color="secondary"
              outline="true"
              size="lg"
              variant="outline"
              @click="articleStore.loadMorePosts"
          />
        </div>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script lang="ts" setup>
const articleStore = useArticleStore()
await articleStore.fetchArticles()
const localePath = useLocalePath()

useHead({
  title: 'Blog - JOTT.MEDIA'
})
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>