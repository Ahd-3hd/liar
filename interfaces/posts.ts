export interface IPost {
  email: string;
  id: string;
  userId: string;
  realQuestion: string;
  fakeQuestion: string;
  isRevealed: boolean;
  comments: IComment[];
}

export interface IComment {
  commentText: string;
  id: string;
  username: string;
}
