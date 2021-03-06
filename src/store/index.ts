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
      const userId = state.profile.user ? state.profile.user.id : null;
      if (userId) {
        if (state.tweets.tweetsByUserId[userId]) {
          state.tweets.tweetsByUserId[userId].push(tweet);
        } else {
          state.tweets.tweetsByUserId[userId] = [tweet];
        }
      }
    },
    likeTweet(state, payload: { tweet: Tweet }) {
      const { tweet } = payload;

      if (state.profile.user && state.tweets.tweetsByUserId[state.profile.user.id]) {
        const likedUserTweet = state.tweets.tweetsByUserId[state.profile.user.id].find(
          t => t.id === tweet.id
        );
        if (likedUserTweet) {
          Vue.set(
            state.tweets.tweetsByUserId[state.profile.user.id],
            state.tweets.tweetsByUserId[state.profile.user.id].indexOf(likedUserTweet),
            tweet
          );
        }
      }
    },
    removeTweet(state, payload: { id: number }) {
      const { id } = payload;

      if (state.profile.user && state.tweets.tweetsByUserId[state.profile.user.id]) {
        Vue.set(
          state.tweets.tweetsByUserId,
          state.profile.user.id,
          state.tweets.tweetsByUserId[state.profile.user.id].filter(t => t.id !== id)
        );
      }
    }
  }
});
