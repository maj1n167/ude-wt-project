import { inject, Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

import {AllStackResponse, StackResponse} from '../models/response/stack-response';
import IStack from '../models/stack';

@Injectable({
  providedIn: 'root'
})
export class StacksService {
  http = inject(HttpClient);
  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  requestAllStacks(): Observable<Array<IStack>> {
    return this.http
      .get<AllStackResponse>(`${environment.api}/stacks`, {
        headers: this.jsonHeaders,
      })
      .pipe(
        map((response: AllStackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        })
      );
  }

  requestCreateStack(title: string): Observable<IStack> {
    return this.http
      .post<StackResponse>(
        `${environment.api}/stacks/create`,
        { name: title },
        {
          headers: this.jsonHeaders,
        }
      )
      .pipe(
        map((response: StackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        })
      );
  }

  requestDeleteStack(_id: string): Observable<IStack> {
    return this.http
      .delete<StackResponse>(`${environment.api}/stacks/${_id}`, {
        headers: this.jsonHeaders,
      })
      .pipe(
        map((response: StackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        })
      );
  }

  requestUpdateStack(_id: string, title: string): Observable<IStack> {
    return this.http
      .put<StackResponse>(
        `${environment.api}/stacks/${_id}`,
        { title },
        {
          headers: this.jsonHeaders,
        }
      )
      .pipe(
        map((response: StackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        })
      )
  }
}
