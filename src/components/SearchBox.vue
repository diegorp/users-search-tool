<template>
    <input class="search-box" type="text" placeholder="Search..." v-model="textToSearch" @keyup="search"/>
</template>

<script>
export default {
    name: 'SearchBox',
    data() {
        return {
            textToSearch: '',
        }
    },
    methods: {
        search() {
            this.$emit('search', this.textToSearch);
        }
    },
}
</script>

<style scoped lang="scss">
    .search-box {
        background: none;
        color: #2c3e50;
        font-size: 18px;
        padding: 10px 5px;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid mix(white, #424242, 70%);
        margin-bottom: 6px;

        &:focus {
            outline: none;
        }
    }
</style>