export interface IPost {
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
