<template>
  <div :class="{'shine': shine}" :style="parallax ? {perspective: '2000px'} : {}" class="image-wrapper">
    <img ref="image" :alt="alt" :src="getImageAbsolutePath(src)" :style="imageStyle"
         class="w-full h-full block m-0 cover bg-center"/>
    <UContainer :ui="{'constrained': 'max-w-2xl'}">
      <Paragraph v-if="hint != null" class="text-jm-primary-gre italic text-sm !mb-0">{{ hint }}</Paragraph>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import {useParallax} from '@vueuse/core'

const image = ref(null)
const parallax = reactive(useParallax(image))
const imageStyle = computed(() => {
  const style = {};

  if (props.cover) {
    style.objectFit = 'cover';
    style.objectPosition = 'center';
  }

  if (props.parallax) {
    style.transition = '.3s ease-out all';
    style.transform = `rotateX(${parallax.roll * 10}deg) rotateY(${parallax.tilt * 10}deg)`;
  }

  return style;
});

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  publicSrc: {
    type: Boolean,
    default: false,
  },
  alt: {
    type: String,
    default: null,
  },
  hint: {
    type: String,
    default: null,
  },
  shine: {
    type: Boolean,
    default: true,
  },
  parallax: {
    type: Boolean,
    default: true,
  },
  cover: {
    type: Boolean,
    default: false,
  },
})

const glob = import.meta.glob<Record<string, string>>('@/assets/images/**/*', {eager: true})
const getImageAbsolutePath = (imageName: string): string | undefined => {
  if (!props.publicSrc) {
    return glob[`/assets/images/${imageName}`]['default'];
  }

  return imageName;
};
</script>

<style lang="scss">
@use 'sass:color';

$color: #fff;
.shine {
  position: relative;
  overflow: hidden;

  &::before {
    background: linear-gradient(
            to right,
            color.scale($color, $alpha: 0.3%) 0%,
            color.scale($color, $alpha: 0.7%) 100%
    );
    content: "";
    display: block;
    height: 100%;
    left: -75%;
    position: absolute;
    top: 0;
    transform: skewX(-25deg);
    width: 50%;
    z-index: 2;
  }

  &:hover,
  &:focus {
    &::before {
      animation: shine 0.85s;
    }
  }

  @keyframes shine {
    100% {
      left: 125%;
    }
  }
}
</style>