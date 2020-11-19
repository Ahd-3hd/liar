export interface IUser {
  userId: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
  friendRequestsReceived: any[];
  friendRequestsSent: any[];
}

export interface IFriend {
  friendId: string;
  friendEmail: string;
  avatar: string;
}
