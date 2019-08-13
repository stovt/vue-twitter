import { User } from './user';

export interface Tweet {
  id: number;
  body: string;
  parent?: number;
  createdAt: string;
  user: User;
  userId: number;
  childrenAmount: number;
}

export type Tweets = Tweet[];

export type TweetsByUserId = Record<number, Tweets>;
