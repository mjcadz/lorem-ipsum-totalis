import { computed, reactive } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { wordsBySeed } from '@/graphql/queries'

type Variables = {
  seed: string | null
  max: number
}

type Options = {
  enabled: boolean
}

type TextOptions = {
  number: number
  type: 'words' | 'sentences' | 'paragraphs'
}

type Word = {
  __typename: string
  word: string
}

const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

function capitalise(word: string) {
  const lower = word.toLowerCase()
  return word.charAt(0).toUpperCase() + lower.slice(1)
}

export const useWords = () => {
  const variables: Variables = reactive({
    seed: null,
    max: 50,
  })

  const options: Options = reactive({
    enabled: false,
  })

  const textOptions: TextOptions = reactive({
    number: 3,
    type: 'sentences',
  })

  const { result, loading, refetch, onError } = useQuery(
    wordsBySeed,
    variables,
    options
  )

  const words = computed(() => {
    if (!result.value) return []
    const words: string[] = []
    words.push(...result.value.describes.map((x: Word) => x.word))
    words.push(...result.value.means.map((x: Word) => x.word))
    words.push(...result.value.synonyms.map((x: Word) => x.word))
    words.push(...result.value.triggers.map((x: Word) => x.word))
    return [...new Set(words)]
  })

  const placeholderText = computed(() => {
    if (words.value.length === 0) return ''
    let shuffledWords = words.value.sort(() => Math.random() - 0.5)
    const type = textOptions.type
    const number = textOptions.number
    let placeholderText = ''

    // paragraphs
    const numParagraphs = type === 'paragraphs' ? number : 1
    for (let i = 0; i < numParagraphs; i++) {
      if (i !== 0) placeholderText += '\n\n'
      // sentences
      const numSentences =
        type === 'sentences' ? number : type === 'words' ? 1 : randomNum(3, 5)
      for (let j = 0; j < numSentences; j++) {
        if (j !== 0) placeholderText += ' '
        // words
        const numWords = type === 'words' ? number : randomNum(10, 15)
        for (let k = 0; k < numWords; k++) {
          if (shuffledWords.length === 0) {
            shuffledWords = words.value.sort(() => Math.random() - 0.5)
          }
          if (k === 0) {
            placeholderText += capitalise(shuffledWords.pop() as string)
          } else {
            placeholderText += ' '
            placeholderText += shuffledWords.pop()
          }
        }
        placeholderText += '.'
      }
    }

    return placeholderText
  })

  onError((e) => {
    console.log(JSON.stringify(e, null, 2))
  })

  const setSeedWord = (seed: string | null) => {
    variables.seed = seed
    options.enabled = true
  }

  return { setSeedWord, words, placeholderText, result, loading, refetch }
}
