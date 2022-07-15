import gql from 'graphql-tag'

export const randomAdjective = gql`
  query randomAdjective {
    randomAdjective
  }
`

export const randomNoun = gql`
  query randomNoun {
    randomNoun
  }
`

export const randomAnimal = gql`
  query randomAnimal {
    randomAnimal
  }
`

export const wordsBySeed = gql`
  query WordsBySeed($seed: String!, $max: Int!) {
    means(num: $max, seed: $seed) {
      word
    }
    synonyms(num: $max, seed: $seed) {
      word
    }
    triggers(num: $max, seed: $seed) {
      word
    }
    describes(num: $max, seed: $seed) {
      word
    }
  }
`
