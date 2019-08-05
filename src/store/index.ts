import Vue from 'vue';
import Vuex from 'vuex';
import { Tweet } from '@/types/tweet';
import profile from './profile';
import tweets from './tweets';
import users from './users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    profile,
    tweets,
    users
  },
  mutations: {
    tweet(state, tweet: Tweet) {
      const userId = state.profile ? state.profile.userId : null;
      if (userId) {
        state.tweets.allTweets.push(tweet);
        if (state.tweets.tweetsByUserId[userId]) {
          state.tweets.tweetsByUserId[userId].push(tweet);
        } else {
          state.tweets.tweetsByUserId[userId] = [tweet];
        }
      }
    },
    removeTweet(state, payload: { id: number }) {
      const { id } = payload;
      const removedTweet = state.tweets.allTweets.find(t => t.id === id);
      if (removedTweet) {
        state.tweets.allTweets = state.tweets.allTweets.splice(
          state.tweets.allTweets.indexOf(removedTweet),
          1
        );
      }

      if (state.profile && state.tweets.tweetsByUserId[state.profile.userId]) {
        Vue.set(state.tweets.tweetsByUserId, state.profile.userId, {
          ...state.tweets.tweetsByUserId[state.profile.userId],
          data: state.tweets.tweetsByUserId[state.profile.userId].filter(t => t.id !== id)
        });
      }
    }
  }
});
