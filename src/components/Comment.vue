<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>
        <span class="font-weight-bold">{{ fullName }}</span
        >{{ ' ' }}
        <router-link
          :to="{ name: 'user', params: { id: comment.userId } }"
          class="btn-link .text-secondary"
          >@{{ comment.userId }}</router-link
        >
      </div>
      <div class="text-secondary">{{ date }}</div>
    </div>
    <p class="mt-2" v-html="comment.body"></p>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { formatDistanceToNow } from 'date-fns';
import { Tweet as TweetType } from '@/types/tweet';

@Component
export default class Comment extends Vue {
  @Prop() private comment!: TweetType;

  get fullName() {
    return `${this.comment.user.firstName} ${this.comment.user.lastName}`;
  }

  get date() {
    return formatDistanceToNow(new Date(this.comment.createdAt));
  }
}
</script>
