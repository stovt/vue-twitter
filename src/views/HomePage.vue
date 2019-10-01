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
    <LoadingAndErrorHandler :loading="tweetsLoading" :error="tweetsError"></LoadingAndErrorHandler>
    <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"></Tweet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler.vue';
import TweetForm from '@/components/TweetForm.vue';
import Tweet from '@/components/Tweet.vue';

@Component({
  components: {
    LoadingAndErrorHandler,
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
        .dispatch('fetchUserTweets', { userId: this.user.id })
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
    return this.user ? this.$store.getters.userTweets(this.user.id) : [];
  }
}
</script>
