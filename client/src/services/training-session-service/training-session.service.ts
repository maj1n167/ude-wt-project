// general
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AllCardResponse } from '../../models/response/card-response';
import ICard from '../../models/card';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TrainingSessionService {
  http = inject(HttpClient);

  constructor() {}

  status(): Observable<any> {
    return this.http.get(`${environment.api}/training/`).pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.error.message));
      }),
    );
  }

  start(stackId: string): Observable<Array<ICard>> {
    return this.http
      .post<AllCardResponse>(`${environment.api}/training/start`, {
        stackId: stackId,
      })
      .pipe(
        map((response: AllCardResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }

  finish(results: any): Observable<any> {
    return this.http.post(`${environment.api}/training/finish`, results);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/training/${id}`).pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.error.message));
      }),
    );
  }

  reset(id: string): Observable<any> {
    return this.http.put(`${environment.api}/training/`, { id: id }).pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.error.message));
      }),
    );
  }
}
