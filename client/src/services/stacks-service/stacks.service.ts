import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import {
  AllStackResponse,
  StackResponse,
} from '../../models/response/stack-response';
import IStack from '../../models/stack';

@Injectable({
  providedIn: 'root',
})
export class StacksService {
  http = inject(HttpClient);

  searchStacks(search: string): Observable<Array<IStack>> {
    return this.http
      .get<AllStackResponse>(`${environment.api}/stacks/search/${search}`)
      .pipe(
        map((response: AllStackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }

  getOwnStacks(): Observable<Array<IStack>> {
    return this.http
      .get<AllStackResponse>(`${environment.api}/stacks/own`)
      .pipe(
        map((response: AllStackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }

  getPublishedStacks(): Observable<Array<IStack>> {
    return this.http.get<AllStackResponse>(`${environment.api}/stacks`).pipe(
      map((response: AllStackResponse) => response.data),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.error.message));
      }),
    );
  }

  createStack(
    name: string,
    description: string,
    published: boolean,
  ): Observable<IStack> {
    return this.http
      .post<StackResponse>(`${environment.api}/stacks/create`, {
        name,
        description,
        published,
      })
      .pipe(
        map((response: StackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }

  deleteStack(stackId: string): Observable<IStack> {
    return this.http
      .delete<StackResponse>(`${environment.api}/stacks/${stackId}`)
      .pipe(
        map((response: StackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }

  updateStack(
    stackId: string,
    name: string,
    description: string,
    published: boolean,
  ): Observable<IStack> {
    return this.http
      .put<StackResponse>(`${environment.api}/stacks/${stackId}`, {
        name,
        description,
        published,
      })
      .pipe(
        map((response: StackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }

  getStack(stackId: string): Observable<IStack> {
    return this.http
      .get<StackResponse>(`${environment.api}/stacks/${stackId}`)
      .pipe(
        map((response: StackResponse) => response.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }
}
