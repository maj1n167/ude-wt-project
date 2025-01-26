export interface ISPost {
  _id: string;
  username: string;
  content: string;
  date: string;
  replies: ISReply[];
}

export interface ISReply {
  _id?: string;
  username: string;
  content: string;
  replies: ISReply[];
}
