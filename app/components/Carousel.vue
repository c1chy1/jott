<template>
  <div class="flex-1 w-full">
    <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :items="items"
        :next="{ onClick: onClickNext }"
        :prev="{ onClick: onClickPrev }"
        arrows
        class="w-full max-w-xs mx-auto z-20"
        @select="onSelect"
    >
      <Image
          :alt="item.alt"
          :parallax="false"
          :shine="false"
          :src="item.src"
      />
    </UCarousel>

    <div class="flex gap-1 justify-between pt-4 max-w-xs mx-auto">
      <div
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'opacity-100': activeIndex === index }"
          class="size-11 opacity-25 hover:opacity-100 transition-opacity cursor-pointer"
          @click="select(index)"
      >
        <Image
            :alt="item.alt"
            :parallax="false"
            :shine="false"
            :src="item.src"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface CarouselItem {
  id: string
  src: string
  alt?: string
}

interface Props {
  items: CarouselItem[]
}

const props = defineProps<Props>()

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev(): void {
  activeIndex.value--
}

function onClickNext(): void {
  activeIndex.value++
}

function onSelect(index: number): void {
  activeIndex.value = index
}

function select(index: number): void {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}
</script>