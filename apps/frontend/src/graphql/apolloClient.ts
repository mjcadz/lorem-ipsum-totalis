import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `apikey sanjuandedios::stepzen.net+1000::fedd4088cd58be15323ed38d9ee02f82c7171d1a53067d0ce2b184aac193663b`,
    },
  }
})

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://sanjuandedios.stepzen.net/api/words/__graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: true,
  credentials: 'include',
})
