<template>
  <div>
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment"></Comment>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Tweet as TweetType } from '@/types/tweet';
import Comment from '@/components/Comment.vue';

@Component({
  components: {
    Comment
  }
})
export default class Comments extends Vue {
  @Prop() private parent!: number;

  mounted() {
    if (!this.comments.length) {
      this.$store.dispatch('fetchTweetComments', { parent: this.parent });
    }
  }

  get comments() {
    return this.$store.getters.tweetComments(this.parent);
  }
}
</script>
