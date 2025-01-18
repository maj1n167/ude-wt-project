import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  id: string;
  username: string;
  content: string;
  date: string;
  replies: Reply[];
}

interface Reply {
  username: string;
  content: string;
  replies?: Reply[];
}

interface GetPostsResponse {
  message: string;
  data: Post[];
}

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private apiUrl = 'http://localhost:3000/forum';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<GetPostsResponse> {
    return this.http.get<GetPostsResponse>(`${this.apiUrl}/posts`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }

  addReply(postId: string, reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(
      `${this.apiUrl}/posts/${postId}/replies`,
      reply,
    );
  }

  deletePost(postId: string): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/posts/${postId}`);
  }
}
