import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL der Backend-API für Login und Registrierung
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

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
    return this.http.post(`http://localhost:3000/users/login`, user);
  }
}
