import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://moviebased.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('token from localStorage: ', token);
    const response = this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          // 'Content-Type': 'application/json',
          Authorization: 'Bearer' + token,
          // Authorization: `Bearer ${token}`
        }),
    });
    return response.pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          // Authorization: 'Bearer' + token,
          Authorization: `Bearer ${token}`
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addToFavs(username: string, title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + 'movies' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  removeFromFavs(username: string, title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + 'movies' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  removeUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  editUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
