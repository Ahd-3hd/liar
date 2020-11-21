export interface IUser {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  friendRequestsReceived: any[];
  friendRequestsSent: any[];
}

export interface IFriend {
  friendId: string;
  friendEmail: string;
  avatar: string;
  username: string;
}
