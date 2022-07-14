import { createApp } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './graphql/apolloClient'
import App from './App.vue'
import 'config/tailwind/styles.scss'

createApp(App).provide(DefaultApolloClient, apolloClient).mount('#app')
