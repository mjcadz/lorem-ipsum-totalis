<script setup lang="ts">
  import { useVModel } from '@vueuse/core'

  type Props = {
    input: string
    uid: string
    placeholder?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: '',
  })

  const emit = defineEmits<{
    (e: 'update:input', value: string): void
  }>()

  const input = useVModel(props, 'input', emit)
</script>

<template>
  <div>
    <label :for="uid" class="sr-only">Input</label>
    <div class="">
      <input
        :id="uid"
        v-model="input"
        type="text"
        :name="uid"
        class="block h-12 w-full rounded-md border-none bg-blue-200 text-lg text-blue-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
