import Vue from 'vue';
import { MutationTree } from 'vuex';
import { Tweet, Tweets } from '@/types/tweet';
import { TweetsState } from '@/types/state';

const mutations: MutationTree<TweetsState> = {
  fetchAllTweets(state, tweets: Tweets) {
    state.allTweets = tweets;
  },
  comment(state, payload: { parent: number; comment: Tweet }) {
    const { parent, comment } = payload;

    Vue.set(state.commentsByTweetId, parent, [...state.commentsByTweetId[parent], comment]);
  },
  fetchTweetComments(state, payload: { parent: number; comments: Tweets }) {
    const { parent, comments } = payload;

    Vue.set(state.commentsByTweetId, parent, comments);
  },
  fetchUserTweets(state, payload: { userId: number; tweets: Tweets }) {
    const { userId, tweets } = payload;

    Vue.set(state.tweetsByUserId, userId, tweets);
  }
};

export default mutations;
