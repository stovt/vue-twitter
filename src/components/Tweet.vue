<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>
        <span class="font-weight-bold">{{ fullName }}</span
        >{{ ' ' }}
        <router-link
          :to="{ name: 'user', params: { id: tweet.userId } }"
          class="btn-link .text-secondary"
          >@{{ tweet.userId }}</router-link
        >
      </div>
      <div class="text-secondary">{{ date }}</div>
    </div>
    <p class="mt-2" v-html="tweet.body"></p>
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <CommentIcon @click.native="toggleComments"></CommentIcon>{{ tweet.childrenAmount || '' }}
      </div>
      <div class="d-flex align-items-center"><LikeIcon></LikeIcon>1</div>
      <TrashIcon v-if="canRemove" @click.native="removeTweet"></TrashIcon>
    </div>
    <LoadingAndErrorHandler
      :loading="removeTweetLoading"
      :error="removeTweetError"
    ></LoadingAndErrorHandler>
    <div v-if="showComments" class="ml-5">
      <hr v-if="user" />
      <CommentForm v-if="user" :parent="tweet.id"></CommentForm>
      <Comments :parent="tweet.id"></Comments>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { distanceInWordsToNow } from 'date-fns';
import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler.vue';
import CommentForm from '@/components/CommentForm.vue';
import Comments from '@/components/Comments.vue';
import CommentIcon from '@/components/Icons/CommentIcon.vue';
import LikeIcon from '@/components/Icons/LikeIcon.vue';
import TrashIcon from '@/components/Icons/TrashIcon.vue';
import { Tweet as TweetType } from '@/types/tweet';
import TweetsService from '@/services/TweetsService';

@Component({
  components: {
    LoadingAndErrorHandler,
    CommentForm,
    Comments,
    CommentIcon,
    LikeIcon,
    TrashIcon
  }
})
export default class Tweet extends Vue {
  @Prop() private tweet!: TweetType;

  showComments: boolean = false;

  canRemove: boolean = false;

  removeTweetLoading: boolean = false;

  removeTweetError: string | null = null;

  mounted() {
    if (this.$store.state.profile.user) {
      this.canRemove = this.$store.state.profile.user.userId === this.tweet.userId;
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  removeTweet() {
    this.removeTweetLoading = true;
    this.removeTweetError = null;

    this.$store
      .dispatch('removeTweet', {
        id: this.tweet.id
      })
      .then(() => {
        this.removeTweetLoading = false;
      })
      .catch(error => {
        this.removeTweetLoading = false;
        this.removeTweetError = error;
      });
  }

  get fullName() {
    return `${this.tweet.user.firstName} ${this.tweet.user.lastName}`;
  }

  get date() {
    return distanceInWordsToNow(new Date(this.tweet.createdAt));
  }

  get user() {
    return this.$store.state.profile.user;
  }
}
</script>
