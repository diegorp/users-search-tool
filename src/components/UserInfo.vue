<template>
    <div class="user">
        <div class="user__info">
            <p class="user__info__name">{{ user.name }}</p>
            <p class="user__info__email">{{ user.email }}</p>
            <p class="user__info__phone">{{ user.phone }}</p>
        </div>
        <div class="user__company">
            <p class="user__company__name">{{ user.company.name }}</p>
            <p class="user__company__phrase">{{ user.company.catchPhrase }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserInfo',
    props: {
        user: Object
    },
}
</script>

<style scoped lang="scss">
    .user {
        display: flex;
        justify-content: space-between;
        background-color: #f6f6f6;

        &__info {
            padding: 0 6px;
            text-align: left;
            flex: 50%;
    
            &__email,
            &__phone {
                font-size: 0.75em;
            }
        }

        &__company {
            padding: 0 6px;
            flex: 50%;
            
            &__phrase {
                font-size: 0.75em;
            }
        }
    }
</style>