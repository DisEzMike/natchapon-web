import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'https://api.mikenatchapon.com/api/';
// const API = 'http://localhost:8080/api/';

//httpOptions
const httpOptions = {
  headers: new HttpHeaders().set('content-type', 'application/json')
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovie(day: string): Observable<string> {
    return this.http.get(
      API+"movie/getmovie/" + day,
      httpOptions
    ) as any
  }
}
