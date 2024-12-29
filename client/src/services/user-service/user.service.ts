// Angular modules
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

// Interfaces
import IUser from '../../models/user';
import {
  AllUserResponse,
  UserResponse,
} from '../../models/response/user-response';

// Services
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

// Environment
import { environment } from '../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  message = inject(NzMessageService);

  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  requestAllUsers(): Observable<Array<IUser>> {
    return this.http
      .get<AllUserResponse>(`${environment.api}/users`, {
        headers: this.jsonHeaders,
      })
      .pipe(
        map((response: AllUserResponse) => {
          this.message.success(response.message);
          return response.data;
        }),
        catchError((err: HttpErrorResponse) => {
          const {
            error: { error },
          } = err;
          if (error) {
            this.message.error(error.message);
          }
          return throwError(() => new Error('Could not fetch users.'));
        }),
      );
  }

  requestCreateUser(name: string): Observable<IUser> {
    return this.http
      .post<UserResponse>(
        `${environment.api}/users/create`,
        { name },
        {
          headers: this.jsonHeaders,
        },
      )
      .pipe(
        map((response: UserResponse) => {
          this.message.success(response.message);
          return response.data;
        }),
        catchError((err: HttpErrorResponse) => {
          const {
            error: { error },
          } = err;
          if (error) {
            this.message.error(error.message);
          }
          return throwError(() => new Error('Could not create user.'));
        }),
      );
  }

  requestDeleteUser(userId: string): Observable<IUser> {
    return this.http
      .delete<UserResponse>(`${environment.api}/users/${userId}`, {
        headers: this.jsonHeaders,
      })
      .pipe(
        map((response: UserResponse) => response.data),
        catchError((err: HttpErrorResponse) => {
          const {
            error: { error },
          } = err;
          if (error) {
            this.message.error(error.message);
          }
          return throwError(() => new Error('Could not delete user'));
        }),
      );
  }
}
