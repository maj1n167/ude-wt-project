import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptorFn,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserResponse } from '../../models/response/user-response';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL der Backend-API für Login und Registrierung
  private apiUrl = 'http://localhost:3000/users';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  /**
   * Checks localStorage for token and user, and updates loggedIn status.
   */
  checkLoginStatus(): void {
    const token = localStorage.getItem('token') ?? '';
    const user = localStorage.getItem('user') ?? '';
    if (token === '' || user === '') {
      this.loggedInSubject.next(false);
    } else {
      this.loggedInSubject.next(true);
    }
  }

  // Registrierung des Benutzers
  register(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login des Benutzers
  login(user: { username: string; password: string }): Observable<any> {
    const response = this.http
      .post<UserResponse>(`http://localhost:3000/users/login`, user)
      .pipe(
        map((response: UserResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
    response.subscribe((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user);
      this.loggedInSubject.next(true);
    });
    return response;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedInSubject.next(false);
  }
}

// interceptor for adding token to requests
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token') ?? '';
  const user = localStorage.getItem('user') ?? '';

  if (token !== '' && user !== '') {
    request = request.clone({
      setHeaders: {
        Token: `${token}`,
        User: `${user}`,
      },
    });
  }
  return next(request);
};
