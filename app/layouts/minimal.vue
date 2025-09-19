<template>
  <UMain>
    <slot/>
  </UMain>
</template>
<script setup>
onMounted(() => {
  if (process.client) {
    document.body.classList.add('minimal-layout')
  }
})

onUnmounted(() => {
  if (process.client) {
    document.body.classList.remove('minimal-layout')
  }
})
</script>
