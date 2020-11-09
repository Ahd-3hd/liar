export interface IPost {
  id: number;
  username: string;
  realQuestion: string;
  fakeQuestion: string;
  isRevealed: boolean;
  comments: IComment[];
}

export interface IComment {
  id: number;
  username: string;
  text: string;
}
