import { ActionTree } from 'vuex';
import TweetsService from '@/services/TweetsService';
import { TweetsState, RootState } from '@/types/state';

const actions: ActionTree<TweetsState, RootState> = {
  tweet({ commit }, payload: { message: string; parent?: number }) {
    const { message, parent } = payload;

    return TweetsService.tweet(message, parent)
      .then(res => {
        const { tweet } = res.data;
        commit('tweet', tweet);
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  },
  fetchAllTweets({ commit }) {
    return TweetsService.getAllTweets()
      .then(res => {
        const { tweets } = res.data;
        commit('fetchAllTweets', tweets);
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  },
  fetchUserTweets({ commit }, payload: { userId: number }) {
    const { userId } = payload;

    return TweetsService.getUserTweets(userId)
      .then(res => {
        const { tweets } = res.data;
        commit('fetchUserTweets', { userId, tweets });
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  },
  comment({ commit }, payload: { message: string; parent: number }) {
    const { message, parent } = payload;

    return TweetsService.tweet(message, parent)
      .then(res => {
        const comment = res.data.tweet;
        commit('comment', { parent, comment });
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  },
  fetchTweetComments({ commit }, payload: { parent: number }) {
    const { parent } = payload;

    return TweetsService.getTweetComments(parent)
      .then(res => {
        const comments = res.data.tweets;
        commit('fetchTweetComments', { parent, comments });
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  },
  likeTweet({ commit }, payload: { id: string }) {
    const { id } = payload;

    return TweetsService.likeTweet(id)
      .then(res => {
        const { tweet } = res.data;
        commit('likeTweet', { tweet });
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  },
  removeTweet({ commit }, payload: { id: string }) {
    const { id } = payload;

    return TweetsService.removeTweet(id)
      .then(() => {
        commit('removeTweet', { id });
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  }
};

export default actions;
