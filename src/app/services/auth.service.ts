import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

import firebase from 'firebase/compat';
import Swal from 'sweetalert2';

// const AUTH_API = 'http://localhost:8080/api/auth/';
const AUTH_API = 'https://api.mikenatchapon.com/api/auth/';

//httpOptions
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const SwalFail = (text: string) =>
  Swal.fire({
    icon: 'error',
    title: 'เกิดข้อผิดพลาด',
    text: text,
    showConfirmButton: false,
    timer: 2000,
  });

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private token: TokenStorageService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  private signInWithGoogle(
    id: string,
    displayName: string,
    email: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin/google',
      {
        id,
        displayName,
        email,
      },
      httpOptions
    );
  }

  // Sign in with Google
  async GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user?.providerData[0]!;
        this.setUser(user).subscribe((data) => {
          if (data.status) {
            if (!data.admin) {
               SwalFail('สามารถเข้าสู่ระบบได้เฉพาะเจ้าหน้าที่').then(() => {this.router.navigateByUrl('/'); location.reload();})
            } else {
              this.token.saveToken(data.accessToken);
              this.token.saveUser(data);
              this.router.navigateByUrl('/');
              location.reload();
            }
          } else {
            SwalFail('กรุณาลองใหม่อีกครั้ง');
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setUser(user: firebase.UserInfo) {
    const { uid, email, displayName } = user;
    switch (user.providerId) {
      case 'google.com':
        return this.signInWithGoogle(uid, displayName || '', email || '');
      default:
        return from(new Observable());
    }
  }
}
