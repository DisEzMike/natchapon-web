import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

// const API = 'http://localhost:8080/api/';
const API = 'https://api.mikenatchapon.com/api/';

//httpOptions
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient, private token: TokenStorageService) {}

  getAwards(id: any = '', cache = false): Observable<any> {
    return this.http.get(API + `award/get/${id}?cache=${cache}`, httpOptions);
  }

  awardCreate(
    title: string,
    description: string,
    link: string,
    image_id: string,
    imageList: any
  ): Observable<any> {
    return this.http.post(
      API + 'award/create',
      {
        title,
        description,
        link,
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
    link: string,
    image_id: number,
    imageList: any
  ): Observable<any> {
    return this.http.post(
      API + 'award/update',
      {
        id,
        title,
        description,
        link,
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
    return this.http.post(API + 'award/image/remove', { id }, httpOptions);
  }

  removeImageNull(): Observable<any> {
    return this.http.post(API + 'award/image/remove/null', {}, httpOptions);
  }

  getAwardLogo(id: number, cache = false): Observable<any> {
    return this.http.get(API + `award/logo/${id}?cache=${cache}`, httpOptions);
  }

  awardPin(id: number): Observable<any> {
    return this.http.post(API + 'award/pin', { id }, httpOptions);
  }

  awardUnpin(id: number): Observable<any> {
    return this.http.post(API + 'award/unpin', { id }, httpOptions);
  }

  getAwardPin(cache = false): Observable<any> {
    return this.http.get(API + 'award/get/pin/all?cache=' + cache, httpOptions);
  }
}
