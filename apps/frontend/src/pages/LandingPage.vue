<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRandomNoun } from '@/composables/useRandomWord'
  import { useWords } from '@/composables/useWords'
  import { ChevronDoubleDownIcon } from '@heroicons/vue/solid'
  import { uiButton, uiInput, uiListbox, uiSpinner } from 'ui'

  type ListItem = {
    id: number
    name: number | 'Words' | 'Sentences' | 'Paragraphs'
  }

  const { noun, onResult, loading: randomLoading } = useRandomNoun()
  const { textOptions, placeholderText, setSeedWord, loading: wordsLoading } = useWords()
  const placeholder = computed(() => `e.g. ${noun.value}...`)
  const seedWord = ref('')

  onResult(() => setSeedWord(noun.value))

  const textTypes: ListItem[] = [
    { id: 1, name: 'Paragraphs' },
    { id: 2, name: 'Sentences' },
    { id: 3, name: 'Words' },
  ]

  const textNumbers: ListItem[] = [
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 },
    { id: 7, name: 7 },
    { id: 8, name: 8 },
    { id: 9, name: 9 },
    { id: 10, name: 10 },
  ]

  const selectedTextType = ref(textTypes[0])
  const selectedTextNumber = ref(textNumbers[1])

  const generate = () => {
    if (seedWord.value !== '') {
      textOptions.number = selectedTextNumber.value.name as number
      textOptions.type = selectedTextType.value.name
      setSeedWord(seedWord.value)
    }
  }

  const scrollToElement = (id: string) => {
    const element = document.querySelector(`${id}`)
    element?.scrollIntoView({ behavior: 'smooth' })
  }
</script>

<template>
  <div class="h-full">
    <div class="flex h-screen w-screen flex-col items-center justify-center bg-blue-200 p-4 pt-2">
      <h1 class="font-dosis text-center text-7xl font-bold">
        Lorem Ipsum <span class="animate-pulse italic text-blue-600">TOTALIS</span>
      </h1>
      <p class="mt-6 text-center text-xl">Generate themed placeholder text from any word or phrase.</p>
      <ChevronDoubleDownIcon
        class="absolute bottom-5 h-12 w-12 animate-bounce cursor-pointer text-blue-500"
        aria-hidden="true"
        @click="scrollToElement('#scrollHere')"
      />
    </div>
    <div id="scrollHere" class="flex min-h-screen w-full items-center justify-center bg-blue-50 p-4 pt-2">
      <div class="mx-auto my-12 h-full w-full max-w-3xl flex-col items-center space-y-6">
        <div class="hidden w-full space-x-2 rounded-xl bg-white p-3 shadow-xl sm:flex">
          <uiListbox v-model:selected="selectedTextNumber" uid="number-select" :list="textNumbers" class="w-20" />
          <uiListbox v-model:selected="selectedTextType" uid="type-select" :list="textTypes" class="w-40" />
          <div class="flex h-12 items-center rounded-md px-1 text-lg italic text-blue-800">About</div>
          <uiInput v-model:input="seedWord" class="flex-1" uid="seed-input" :placeholder="placeholder" />
          <uiButton uid="generate-button" @click="generate"> Generate </uiButton>
        </div>
        <div class="flex w-full flex-col space-y-2 rounded-xl bg-white p-3 shadow-xl sm:hidden">
          <div class="flex space-x-2">
            <uiButton uid="generate-button" @click="generate"> Generate </uiButton>
            <uiListbox v-model:selected="selectedTextNumber" uid="number-select" :list="textNumbers" class="w-24" />
            <uiListbox v-model:selected="selectedTextType" uid="type-select" :list="textTypes" class="flex-1" />
          </div>
          <div class="flex space-x-2">
            <div class="flex h-12 items-center rounded-md pl-4 pr-4 text-lg italic text-blue-800">About</div>
            <uiInput v-model:input="seedWord" class="flex-1" uid="seed-input" :placeholder="placeholder" />
          </div>
        </div>
        <div class="flex-1 rounded-xl bg-white p-3 text-blue-800 shadow-xl">
          <div v-if="wordsLoading || randomLoading" class="flex h-48 items-center justify-center bg-blue-200 p-6">
            <uiSpinner class="h-8 w-8 fill-blue-800 text-blue-500" />
          </div>
          <div v-else class="whitespace-pre-line rounded-md bg-blue-200 p-6 text-lg">
            {{ placeholderText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
