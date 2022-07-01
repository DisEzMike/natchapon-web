import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API = 'http://localhost:8080/api/';
// const API = 'https://api.mikenatchapon.me/api/';

//httpOptions
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient, private token: TokenStorageService) {}

  getAwards(): Observable<any> {
    return this.http.get(API + 'award/get', httpOptions);
  }

  awardCreate(
    title: string,
    description: string,
    image_id: string,
    imageList: any
  ): Observable<any> {
    return this.http.post(
      API + 'award/create',
      {
        title,
        description,
        image_id,
        imageList,
      },
      httpOptions
    );
  }

  awardUpdate(
    id: number,
    title: string,
    description: string,
    image_id: number,
    imageList: any
  ): Observable<any> {
    return this.http.post(
      API + 'award/update',
      {
        id,
        title,
        description,
        image_id,
        imageList,
      },
      httpOptions
    );
  }

  awardRemove(id: number): Observable<any> {
    return this.http.post(
      API + 'award/remove',
      {
        id,
      },
      httpOptions
    );
  }

  awardDelete(id: number): Observable<any> {
    return this.http.post(
      API + 'award/delete',
      {
        id,
      },
      httpOptions
    );
  }

  awardUpload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API + 'award/upload', formData);
  }

  getAwardimg(id: number): Observable<any> {
    return this.http.get(API + 'award/image/' + id, httpOptions);
  }

  removeImage(id: number): Observable<any> {
    return this.http.post(API + 'image/remove', { id }, httpOptions);
  }

  removeImageNull(): Observable<any> {
    return this.http.post(API + 'image/remove/null', {}, httpOptions);
  }

  getAwardLogo(id: number): Observable<any> {
    return this.http.get(API + 'award/logo/' + id, httpOptions);
  }
}
