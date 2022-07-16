<script setup lang="ts">
  import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
  import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
  import { useVModel } from '@vueuse/core'

  type ListItem = {
    id: number
    name: string
  }

  type Props = {
    list: ListItem[]
    selected: ListItem
    uid: string
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:selected', value: ListItem): void
  }>()

  const selected = useVModel(props, 'selected', emit)
</script>

<template>
  <Listbox v-model="selected" as="div">
    <ListboxLabel class="sr-only"> Listbox </ListboxLabel>
    <div class="relative">
      <ListboxButton
        class="relative h-12 w-full cursor-default rounded-md bg-blue-500 py-2 pl-3 pr-10 text-left text-white shadow-sm focus:outline-none focus:ring focus:ring-blue-600 sm:text-lg"
      >
        <span class="block truncate">{{ selected.name }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <SelectorIcon class="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="item in list"
            :key="item.id"
            v-slot="{ active, selectedItem }"
            as="template"
            :value="item"
          >
            <li
              :class="[
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <span :class="[selectedItem ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ item.name }}
              </span>

              <span
                v-if="selectedItem"
                :class="[active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
