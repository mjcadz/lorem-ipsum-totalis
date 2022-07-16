import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { randomAdjective, randomAnimal, randomNoun } from '@/graphql/queries'

export const useRandomNoun = () => {
  const { result, loading, refetch, onError, onResult } = useQuery(randomNoun)

  const noun = computed(() => {
    if (!result.value) return ''
    return result.value.randomNoun[0]
  })

  // onError((e) => {
  //   console.log(JSON.stringify(e, null, 2))
  // })

  return { noun, loading, refetch, onResult }
}
