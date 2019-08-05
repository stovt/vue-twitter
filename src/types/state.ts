import { User, Users } from './user';
import { Tweets, TweetsByUserId } from './tweet';

export interface ProfileState {
  user: User | null;
}

export interface TweetsState {
  allTweets: Tweets;
  tweetsByUserId: TweetsByUserId;
  commentsByTweetId: TweetsByUserId;
}

export interface UsersState {
  all: Users;
  byId: Record<string, User>;
}

export interface RootState {
  profile: ProfileState;
  tweets: TweetsState;
  users: UsersState;
}
