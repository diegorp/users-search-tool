<template>
  <SearchBox @search="search"/>
  <UsersList :users="users"/>
</template>

<script>
import UsersList from './components/UsersList.vue'
import SearchBox from './components/SearchBox.vue'

import gql from 'graphql-tag'
import {apolloClient} from './apolloClient'

const LIMIT = 10;
const START_PAGE = 0;

const query = gql`
  query Users($q: String, $page: Int, $limit: Int) {
    users(options: { search: { q: $q }, paginate: { page: $page, limit: $limit } }) {
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
  methods: {
    async search(textToSearch) {
      // if (textToSearch) {
        const result = await apolloClient.query({query: query, variables: { q: textToSearch, page: START_PAGE, limit: LIMIT }});
        console.log(result);
        this.users = result?.data.users.data;
      // } else {
      //   this.users = [];
      // }
      this.$forceUpdate();
    }
  },
  components: {
    SearchBox,
    UsersList
  }
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
