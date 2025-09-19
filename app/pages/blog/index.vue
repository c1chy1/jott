<template>
  <UPage class="m-0 p-0 bg-(--color-jm-secondary-white)">
    <UPageBody>
      <UContainer class="max-w-(--container-2xl) text-center">
        <NuxtLink :to="localePath('/')" class="inline-block no-underline border-0">
          <Image :parallax="false" :shine="false" alt="JOTT.MEDIA GmbH" class="w-[325px] mt-2" src="logo.svg"/>
        </NuxtLink>
      </UContainer>
      <UContainer class="pt-6 max-w-(--container-7xl)">
        <Headline class="pb-8 leading-8 lg:leading-5 text-4xl lowercase font-bold" type="h2">
          <b class="text-(--color-jm-primary-brown) uppercase">{{ t('world.new') }}</b>
          <span class="font-medium px-2">{{ t('world.from') }}</span>
          <b class="text-(--color-jm-primary-brown) uppercase">{{ t('world.digital') }}</b>
        </Headline>
        <Paragraph class="text-sm lg:text-tiny mb-8 w-1/2">{{ t('blog.agency') }}</Paragraph>
        <UContainer class="max-w-(--container-6xl) px-0 sm:px-0 lg:px-0 space-x-4 space-y-4 ml-0">
          <UButton
              v-for="(category, index) in articleStore.categories"
              :key="index"
              :label="category"
              class="hover:bg-(--color-jm-primary-brown)/75 hover:text-(--ui-bg) hover:border-(--color-jm-primary-brown) cursor-pointer"
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
                :to="localePath(`/blog/${article.slug}`)"
                as="li"
                class="bg-(--color-jm-secondary-grey-lighter) mt-6"
                v-bind="article">

              <template #header>
                <NuxtImg
                    :alt="(article as any).meta?.imageAlt || (article as any).meta?.name"
                    :src="(article as any).meta?.image"
                    format="webp"
                    loading="lazy"
                />
              </template>
              <template #title>
                <div class="px-4" v-html="article.title"></div>
              </template>
              <template #date>
                <Paragraph class="px-4 text-(--color-jm-primary-green) text-sm font-light">{{ article.date }}
                  {{ t('challenges.of') }}
                  <b class="text-jm-primary-green uppercase">
                    <NuxtLink :to="localePath(`/team/${article?.meta?.author?.toLowerCase()}`)"
                              class="text-(--color-jm-primary-green) font-extrabold relative z-10"
                              @click.stop>
                      {{ article.meta.author }}
                    </NuxtLink>
                  </b>
                </Paragraph>
              </template>
              <template #description>
                <p class="px-4 text-sm font-light">{{ truncateText(article.description, 250) }}
                </p>
              </template>
              <template #authors>
                <UBadge
                    v-for="(category, index) in (article.meta.categories as unknown[]).slice(1)"
                    :key="index"
                    class="px-2 mb-4 mx-4 text-xs text-(--color-jm-secondary-white) bg-(--color-jm-primary-brown) font-extrabold uppercase"
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
              :label="t('NoFurtherPosts')"
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
const {t} = useI18n()
useHead({
  title: 'Blog - JOTT.MEDIA'
})

definePageMeta({
  layout: 'default'
})

function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}
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