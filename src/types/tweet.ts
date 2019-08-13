import { User } from './user';

export interface Tweet {
  id: number;
  body: string;
  createdAt: string;
  user: User;
  userId: number;
  childrenAmount: number;
  likesCount: number;
  liked: boolean;
}

export type Tweets = Tweet[];

export type TweetsByUserId = Record<number, Tweets>;
