<template>
    <template v-for="user in users" :key="user.id">
        <UserInfo :user="user"/>
    </template>
</template>

<script>
import UserInfo from './UserInfo.vue'

export default {
    name: 'UsersList',
    props: {
        users: Array
    },
    components: {
        UserInfo
    },
}
</script>

<style scoped lang="scss">
    .user:not(:first-child) {
        margin-top: 2px;
    }
</style>