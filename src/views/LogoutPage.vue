<template>
  <div>Loading...</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LogoutPage extends Vue {
  mounted() {
    this.$store.dispatch('logout');
  }
}
</script>
