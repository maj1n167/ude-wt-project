export interface ISReply {
  _id?: string;
  username: string;
  content: string;
  postId?: string;
  parentReplyId?: string | null;
  replies: ISReply[];
  creator: string; // Add creator property
}

export interface ISPost {
  _id?: string;
  username: string;
  content: string;
  date?: Date;
  replies: ISReply[];
  creator: string; // Add creator property
}
