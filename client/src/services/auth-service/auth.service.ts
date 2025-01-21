import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { TokenResponse } from '../../models/response/token-response';
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
      this.checkToken().subscribe((state) => {
        this.loggedInSubject.next(state);
      });
    }
  }

  getUser() {
    return this.http.get<UserResponse>(`${this.apiUrl}/`).pipe(
      map((response: UserResponse) => {
        console.log(response);
        return response.data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.error.message));
      }),
    );
  }

  checkToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.get(`${this.apiUrl}/check`).pipe(
      map((response: any) => {
        return response.message;
      }),
      catchError((error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return of(false); // Return `false` in case of an error
      }),
    );
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
      .post<TokenResponse>(`${this.apiUrl}/login`, user)
      .pipe(
        map((response: TokenResponse) => response.data),
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
