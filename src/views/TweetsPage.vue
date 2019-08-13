<template>
  <div>
    <LoadingAndErrorHandler :loading="loading" :error="error"></LoadingAndErrorHandler>
    <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"></Tweet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler.vue';
import Tweet from '@/components/Tweet.vue';

@Component({
  components: {
    LoadingAndErrorHandler,
    Tweet
  }
})
export default class TweetsPage extends Vue {
  loading: boolean = false;

  error: string | null = null;

  mounted() {
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

  get tweets() {
    return this.$store.getters.allTweets;
  }
}
</script>
