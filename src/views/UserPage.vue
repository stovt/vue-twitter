<template>
  <div>
    <div v-if="userLoading" class="alert alert-secondary" role="alert">Loading...</div>
    <div v-if="userError" class="alert alert-danger" role="alert">{{ userError }}</div>
    <h4 v-if="user" class="mb-5">
      <b
        >{{ fullName }},
        <router-link
          :to="{ name: 'user', params: { id: user.id } }"
          class="btn-link .text-secondary"
          >@{{ user.id }}</router-link
        ></b
      >
    </h4>
    <div v-if="tweetsLoading" class="alert alert-secondary" role="alert">Loading...</div>
    <div v-if="tweetsError" class="alert alert-danger" role="alert">{{ tweetsError }}</div>
    <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"></Tweet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tweet from '@/components/Tweet.vue';

@Component({
  components: {
    Tweet
  }
})
export default class UserPage extends Vue {
  userLoading: boolean = false;

  userError: string | null = null;

  tweetsLoading: boolean = false;

  tweetsError: string | null = null;

  mounted() {
    if (this.$route.params.id) {
      if (!this.user) {
        this.userLoading = true;
        this.userError = null;
        this.$store
          .dispatch('fetchUser', { id: this.$route.params.id })
          .then(() => {
            this.userLoading = false;
          })
          .catch(error => {
            this.userLoading = false;
            this.userError = error;
          });
      }
      if (!this.tweets.length) {
        this.tweetsLoading = true;
        this.tweetsError = null;
        this.$store
          .dispatch('fetchUserTweets', { userId: this.$route.params.id })
          .then(() => {
            this.tweetsLoading = false;
          })
          .catch(error => {
            this.tweetsLoading = false;
            this.tweetsError = error;
          });
      }
    }
  }

  get user() {
    return this.$route.params.id ? this.$store.getters.userById(this.$route.params.id) : null;
  }

  get fullName() {
    return this.user ? `${this.user.firstName} ${this.user.lastName}` : '';
  }

  get tweets() {
    return this.user ? this.$store.getters.userTweets(this.user.id) : [];
  }
}
</script>
