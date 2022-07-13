<script setup lang="ts">
  import { uiButton } from 'ui'

  const scrollToElement = (id: string) => {
    const element = document.querySelector(`${id}`)
    element?.scrollIntoView({ behavior: 'smooth' })
  }
</script>

<template>
  <div class="h-screen snap-y snap-mandatory overflow-scroll">
    <div
      class="flex h-screen w-screen snap-start items-center justify-center bg-purple-100 p-4 pt-2"
    >
      <div class="flex flex-col items-center space-y-8">
        <h1 class="text-7xl font-medium">
          Lorem Ipsum <span class="italic text-purple-600">Totalis</span>
        </h1>
        <uiButton uid="cta-button" @click="scrollToElement('#scrollHere')">
          Generate Placeholder Text
        </uiButton>
      </div>
    </div>
    <div
      id="scrollHere"
      class="flex h-screen w-screen snap-start items-center justify-center bg-white p-4 pt-2"
    >
      <div class="flex flex-col items-center space-y-8">
        <h1 class="text-7xl font-bold">LOREM IPSUM TOTALIS</h1>
        <button
          class="rounded-full bg-purple-500 px-10 py-4 text-2xl text-white"
        >
          Generate Placeholder Text
        </button>
      </div>
    </div>
  </div>
</template>
