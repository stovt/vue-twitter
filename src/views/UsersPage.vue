<template>
  <div>
    <LoadingAndErrorHandler :loading="loading" :error="error"></LoadingAndErrorHandler>
    <ul class="list-group">
      <li v-for="user in users" :key="user.id" class="list-group-item">
        <div>{{ user.fullName }}</div>
        <router-link :to="{ name: 'user', params: { id: user.id } }">
          <div>@{{ user.id }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler.vue';

@Component({
  components: {
    LoadingAndErrorHandler
  }
})
export default class UsersPage extends Vue {
  loading: boolean = false;

  error: string | null = null;

  mounted() {
    if (!this.users.length) {
      this.loading = true;
      this.error = null;

      this.$store
        .dispatch('fetchUsers')
        .then(() => {
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.error = error;
        });
    }
  }

  get users() {
    return this.$store.getters.users;
  }
}
</script>
