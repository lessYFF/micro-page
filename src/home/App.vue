<template>
    <div class="home-page">
        <h1 class="home-page__hd">home page</h1>
        <div class="home-page__bd">
            <div class="home-page__bd_item" :key="index" v-for="(item, index) of pageList">
                <a :href="item.url" class="home-page__bd_href">{{ item.name }}</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    pageList = [
        {
            name: 'page-vue',
            url: 'http://localhost:1234/page-vue/index.html',
        },
        {
            name: 'page-react',
            url: 'http://localhost:1234/page-react/index.html',
        },
        {
            name: 'page-jquery',
            url: 'http://localhost:1234/page-jquery/index.html',
        },
    ]
}
</script>

<style scoped lang="scss">
.home-page__hd {
    text-align: center;
}
.home-page__bd_item {
    border-bottom: 1px solid #eee;
}
.home-page__bd_href {
    display: block;
    padding: 10px;
    color: #666;
    text-decoration-line: none;

    &:hover {
        color: turquoise;
        background-image: linear-gradient(45deg, #000, transparent);
    }
}
</style>