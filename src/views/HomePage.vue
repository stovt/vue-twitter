<template>
  <div>
    <h3>Hi {{ fullName }}!</h3>
    <p>You're logged in with Vue + Vuex & JWT!!</p>
    <p>
      <router-link to="/logout">Logout</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomePage extends Vue {
  get fullName() {
    return this.$store.getters.fullName;
  }
}
</script>
