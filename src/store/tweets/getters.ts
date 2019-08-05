import { GetterTree } from 'vuex';
import { TweetsState, RootState } from '@/types/state';

const getters: GetterTree<TweetsState, RootState> = {
  allTweets: state => {
    return state.allTweets.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  userTweets: state => (userId: number) => {
    if (state.tweetsByUserId[userId]) {
      return state.tweetsByUserId[userId].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return [];
  },
  tweetComments: state => (parent: number) => {
    if (state.commentsByTweetId[parent]) {
      return state.commentsByTweetId[parent].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return [];
  }
};

export default getters;
