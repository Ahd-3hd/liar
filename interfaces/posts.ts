export interface IPost {
  email: string;
  id: string;
  userId: string;
  realQuestion: string;
  fakeQuestion: string;
  isRevealed: boolean;
  comments: IComment[];
  avatar: string;
  commentorsIds: string[];
}

export interface IComment {
  avatar: string;
  commentText: string;
  id: string;
  username: string;
}
