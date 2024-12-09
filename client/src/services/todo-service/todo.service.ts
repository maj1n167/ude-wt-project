// Angular modules
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

// Interfaces
import {
  TodoResponse,
  AllTodoResponse,
} from '../../models/response/todo-response';

// Services
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

// Environment
import { environment } from '../../environments/environment';
import ITodo from '../../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  requestUserTodos(userId: string): Observable<Array<ITodo>> {
    return this.http
      .get<AllTodoResponse>(`${environment.api}/users/${userId}/todos`, {
        headers: this.jsonHeaders,
      })
      .pipe(
        map((response: AllTodoResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        })
      );
  }

  requestCreateTodo(userId: string, title: string): Observable<ITodo> {
    return this.http
      .post<TodoResponse>(
        `${environment.api}/users/${userId}/todos/create`,
        { title },
        {
          headers: this.jsonHeaders,
        }
      )
      .pipe(
        map((response: TodoResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        })
      );
  }

  requestDeleteTodo(userId: string, todoId: string): Observable<ITodo> {
    return this.http
      .delete<TodoResponse>(
        `${environment.api}/users/${userId}/todos/${todoId}`,
        {
          headers: this.jsonHeaders,
        }
      )
      .pipe(
        map((response: TodoResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        })
      );
  }
}
