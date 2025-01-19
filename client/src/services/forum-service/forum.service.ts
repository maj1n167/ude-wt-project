import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ISPost, ISReply } from '../../models/post.model';

interface GetPostsResponse {
  message: string;
  data: ISPost[];
}

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private apiUrl = 'http://localhost:3000/forum';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<ISPost[]> {
    return this.http.get<GetPostsResponse>(`${this.apiUrl}/posts`).pipe(
      map((response: GetPostsResponse) => response.data),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.message));
      }),
    );
  }

  createPost(post: ISPost): Observable<ISPost> {
    return this.http.post<ISPost>(`${this.apiUrl}/posts`, post).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.message));
      }),
    );
  }

  addReply(postId: string, reply: ISReply, parentReplyId?: string): Observable<ISReply> {
    const body = { ...reply, parentReplyId };
    return this.http.post<ISReply>(
      `${this.apiUrl}/posts/${postId}/replies`,
      body,
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.message));
      }),
    );
  }

  deletePost(postId: string): Observable<ISPost> {
    return this.http.delete<ISPost>(`${this.apiUrl}/posts/${postId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.message));
      }),
    );
  }
}
