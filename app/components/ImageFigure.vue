<template>
  <div :class="typeToClass[align]" class="flex">
    <div class="md:w-2/5 space-y-10 relative">
      <Image :alt="hint ?? ''" :src="src"/>
      <UButton
          :style="{ backgroundColor: 'var(--color-jm-contrast-black)'}"
          :to="link"
          :ui="{ base: 'h-12 w-12 flex opacity-70 justify-center border-0 items-center transition-opacity duration-300 ease rounded-full absolute sm:-right-6 top-0 sm:top-auto sm:-bottom-5 rounded-full transition-all z-10' }"
          class="hover:!opacity-100"
          outline="false"
          size="lg"
          variant="outline"
      >
        <UIcon
            class="bg-(--color-nuxt-ui-brown-50) size-7"
            name="i-mdi-plus"
        />
      </UButton>
      <div class="md:absolute">
        <h5 class="text-lg uppercase h-animation-bigger my-0 mb-4" v-html="quote"/>
        <Paragraph v-if="hint != null" class="italic text-sm mb-10">{{ hint }}</Paragraph>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  align: {
    type: String,
    default: 'left'
  },
  src: {
    type: String,
    default: null
  },
  hint: {
    type: String,
    default: null
  },
  quote: {
    type: String,
    default: null
  },
  link: {
    type: String,
    default: null
  }
})

const typeToClass = {
  left: 'justify-start',
  right: 'justify-end',
}
</script>
