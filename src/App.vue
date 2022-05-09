<template>
  <SearchBox @search="search"/>
  <UsersList :users="users"/>
  <div v-if="isLoading" class="loading"><img src="./assets/loading.gif"></div>
</template>

<script>
import UsersList from './components/UsersList.vue';
import SearchBox from './components/SearchBox.vue';

import { apolloClient } from './apolloConfig/apolloClient';
import { USERS_QUERY } from './apolloConfig/usersQuery';

export default {
  name: 'App',
  data() {
    return {
      apollo: {
        client: apolloClient,
        usersQuery: USERS_QUERY,
        limit: 5, // Setting it to 5 instead of 10 because there are only 10 elements on the API
        startPage: 0,
      },
      users: [],
      textToSearch: '',
      isLoading: false,
    }
  },
  methods: {
    async search(textToSearch) {
      this.textToSearch = textToSearch;
      if (textToSearch) {
        this.isLoading = true;
        const result = await this.fetchUsers(textToSearch, this.apollo.startPage, this.apollo.limit);
        this.isLoading = false;
        this.users = result?.data.users.data;
      } else {
        this.users = [];
      }
    },
    async fetchNextUser() {
      const roundedDocumentHeight = Math.ceil(document.documentElement.offsetHeight);
      const roundedScrollPosition = Math.ceil(document.documentElement.scrollTop + window.innerHeight);
      const bottomOfWindow = roundedScrollPosition === roundedDocumentHeight;
      if (bottomOfWindow) {
        this.isLoading = true;
        const page = this.users.length;
        const result = await this.fetchUsers(this.textToSearch, page, 1);
        this.isLoading = false;
        this.users = [...this.users, ...result?.data.users.data];
      }
    },
    fetchUsers(textToSearch, page, limit) {
      return this.apollo.client.query({
        query: this.apollo.usersQuery,
        variables: {
          q: textToSearch,
          page,
          limit
        }
      });
    },
  },
  mounted() {
    window.onscroll = () => this.fetchNextUser();
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

  .loading {
    text-align: center;

    img {
      width: 64px;
    }
  }
}
</style>
