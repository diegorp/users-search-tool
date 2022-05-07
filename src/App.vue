<template>
  <SearchBox @search="search"/>
  <UsersList :users="users"/>
</template>

<script>
import UsersList from './components/UsersList.vue'
import SearchBox from './components/SearchBox.vue'

import gql from 'graphql-tag'
import { apolloClient } from './apolloClient'

const LIMIT = 5;
const START_PAGE = 0;
const QUERY = gql`
  query Users($q: String, $page: Int, $limit: Int) {
    users(options: { search: { q: $q }, slice: { start: $page, limit: $limit } }) {
      data {
        id
        name
        email
        phone
        company {
          name
          catchPhrase
        }
      },
      meta {
        totalCount
      }
    }
  }
`;

export default {
  name: 'App',
  users: [],
  textToSearch: '',
  methods: {
    async search(textToSearch) {
      this.page = 0;
      this.textToSearch = textToSearch;
      if (textToSearch) {
        const result = await fetchUsers(textToSearch, START_PAGE,LIMIT);
        this.users = result?.data.users.data;
      } else {
        this.users = [];
      }
      this.$forceUpdate();
    },
    async fetchNextUser() {
      const roundedDocumentHeight = Math.ceil(document.documentElement.offsetHeight);
      const roundedScrollPosition = Math.ceil(document.documentElement.scrollTop + window.innerHeight);
      const bottomOfWindow = roundedScrollPosition === roundedDocumentHeight;
      if (bottomOfWindow) {
        const page = this.users.length;
        const result = await fetchUsers(this.textToSearch, page, 1);
        this.users = [...this.users, ...result?.data.users.data];
        this.$forceUpdate();
      }
    }
  },
  mounted() {
    window.onscroll = () => this.fetchNextUser();
  },
  components: {
    SearchBox,
    UsersList
  }
}

function fetchUsers(textToSearch, page, limit) {
  return apolloClient.query({query: QUERY, variables: { q: textToSearch, page, limit }});
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
</style>
