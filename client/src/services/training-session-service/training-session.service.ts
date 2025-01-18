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

  finish(results: any): void {
    console.log(results);
    this.http.post(`${environment.api}/training/finish`, results).subscribe({
      next: (response) => {
        console.log('Request successful:', response);
      },
      error: (error) => {
        console.error('Request failed:', error);
      },
    });
  }
}
