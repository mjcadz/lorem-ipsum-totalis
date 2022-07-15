import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { randomAdjective, randomAnimal, randomNoun } from '@/graphql/queries'

export const useRandomAdjective = () => {
  const { result, loading, refetch, onError } = useQuery(randomAdjective)

  const adjective = computed(() => result.value.randomAdjective[0])

  onError((e) => {
    console.log(JSON.stringify(e, null, 2))
  })

  return { adjective, loading, refetch }
}
