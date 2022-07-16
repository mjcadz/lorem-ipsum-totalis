<script setup lang="ts">
  type Props = {
    uid: string
  }

  defineProps<Props>()
</script>

<template>
  <button :id="uid" class="h-12 rounded-md bg-blue-500 px-3 text-lg text-white">
    <slot />
  </button>
</template>
