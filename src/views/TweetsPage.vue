<template>
  <div>
    <div v-if="loading" class="alert alert-secondary" role="alert">Loading...</div>
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
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
export default class TweetsPage extends Vue {
  loading: boolean = false;

  error: string | null = null;

  mounted() {
    if (!this.tweets.length) {
      this.loading = true;

      this.$store
        .dispatch('fetchAllTweets')
        .then(() => {
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.error = error;
        });
    }
  }

  get tweets() {
    return this.$store.getters.allTweets;
  }
}
</script>
