<template>
  <ul class="nav nav-pills justify-content-center py-4">
    <li class="nav-item">
      <router-link exact to="/" class="nav-link" active-class="active">Home</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/tweets" class="nav-link" active-class="active">Tweets</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/users" class="nav-link" active-class="active">Users</router-link>
    </li>
    <li v-if="user" class="nav-item">
      <router-link to="/logout" class="nav-link" active-class="active">Sign Out</router-link>
    </li>
    <li v-if="!user" class="nav-item">
      <router-link to="/login" class="nav-link" active-class="active">Sign In</router-link>
    </li>
    <li v-if="!user" class="nav-item">
      <router-link to="/register" class="nav-link" active-class="active">Sign Up</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  get user() {
    return this.$store.state.profile.user;
  }
}
</script>
