<template>
  <div>
    <div v-if="user">
      <h3>
        Hi, <b>{{ fullName }}</b
        >!
      </h3>
      <p>You're logged in with Vue + Vuex & JWT!!</p>
    </div>
    <h5 v-else class="text-center">
      <router-link to="/login" class="btn-link">Sign In</router-link> or
      <router-link to="/register" class="btn-link">Sign Up</router-link> to post your tweets.
    </h5>
    <TweetForm v-if="user"></TweetForm>
    <div v-if="tweetsLoading" class="alert alert-secondary" role="alert">Loading...</div>
    <div v-if="tweetsError" class="alert alert-danger" role="alert">{{ tweetsError }}</div>
    <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"></Tweet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TweetForm from '@/components/TweetForm.vue';
import Tweet from '@/components/Tweet.vue';

@Component({
  components: {
    TweetForm,
    Tweet
  }
})
export default class HomePage extends Vue {
  tweetsLoading: boolean = false;

  tweetsError: string | null = null;

  mounted() {
    if (this.user && !this.tweets.length) {
      this.tweetsLoading = true;
      this.tweetsError = null;

      this.$store
        .dispatch('fetchUserTweets', { userId: this.user.userId })
        .then(() => {
          this.tweetsLoading = false;
        })
        .catch(error => {
          this.tweetsLoading = false;
          this.tweetsError = error;
        });
    }
  }

  get fullName() {
    return this.$store.getters.fullName;
  }

  get user() {
    return this.$store.state.profile.user;
  }

  get tweets() {
    return this.user ? this.$store.getters.userTweets(this.user.userId) : [];
  }
}
</script>
