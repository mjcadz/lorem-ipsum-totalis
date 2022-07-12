<script setup lang="ts">
  type Props = {
    uid: string
  }

  defineProps<Props>()
</script>

<template>
  <button
    :id="uid"
    class="rounded-full bg-purple-500 px-10 py-4 text-2xl text-white"
  >
    <slot />
  </button>
</template>
