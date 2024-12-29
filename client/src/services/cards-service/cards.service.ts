// general
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

// specific
import {
  AllCardResponse,
  CardResponse,
} from '../../models/response/card-response';
import ICard from '../../models/card';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  http = inject(HttpClient);
  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getCards(stackId: string): Observable<Array<ICard>> {
    return this.http
      .get<AllCardResponse>(`${environment.api}/cards/${stackId}`, {
        headers: this.jsonHeaders,
      })
      .pipe(
        map((response: AllCardResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }

  createCard(stackId: string, front: string, back: string): Observable<ICard> {
    return this.http
      .post<CardResponse>(
        `${environment.api}/cards/${stackId}`,
        { front, back },
        {
          headers: this.jsonHeaders,
        },
      )
      .pipe(
        map((response: CardResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }

  updateCard(cardId: string, front: string, back: string): Observable<ICard> {
    return this.http
      .put<CardResponse>(
        `${environment.api}/cards/${cardId}`,
        { front, back },
        {
          headers: this.jsonHeaders,
        },
      )
      .pipe(
        map((response: CardResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }

  deleteCard(cardId: string): Observable<ICard> {
    return this.http
      .delete<CardResponse>(`${environment.api}/cards/${cardId}`, {
        headers: this.jsonHeaders,
      })
      .pipe(
        map((response: CardResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }
}
