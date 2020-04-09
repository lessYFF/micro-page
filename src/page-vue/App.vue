<template>
    <h1>{{name}}</h1>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    name: string = 'Parcel vue'
}
</script>