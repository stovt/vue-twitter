import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { TweetsState, RootState } from '@/types/state';

export const state: TweetsState = {
  allTweets: [],
  tweetsByUserId: {},
  commentsByTweetId: {}
};

const tweets: Module<TweetsState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default tweets;
