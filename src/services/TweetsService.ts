import Api from '@/services/Api';

export default {
  tweet(message: string, parent?: number) {
    return Api().post('/tweet/create', {
      body: message,
      parent
    });
  },
  getAllTweets() {
    return Api().get('/tweet/get/all');
  },
  getUserTweets(userId: number) {
    return Api().get(`/tweet/get/user/${userId}`);
  },
  getTweetComments(parent: number) {
    return Api().get(`/tweet/get/parent/${parent}`);
  },
  likeTweet(id: string) {
    return Api().post(`/like/${id}`);
  },
  removeTweet(id: string) {
    return Api().post(`/tweet/delete/${id}`);
  }
};
