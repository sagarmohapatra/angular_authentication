import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  idToken: any;
  email: any;
  refreshToken: any;
  expiresIn: any;
  localId: any;
  registered?: boolean;
  constructor(private http: HttpClient) {}
  isLoggedIn = false;

  signup(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByah49euVrS1uh_XEmUI-oQW7Aa9HYEMY`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes: any) => {
          let errorMessage = 'An Error Ocurred';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'Email Already Exist ';
          }
          return throwError(errorMessage);
        })
      );
  }
  login(email: string, password: string) {
    // this.isLoggedIn = true;
    this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByah49euVrS1uh_XEmUI-oQW7Aa9HYEMY`,
      { email, password, returnSecureToken: true }
    );
  }
  logout() {
    // this.isLoggedIn = false;
  }
  isAuthentication() {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove(this.isLoggedIn);
      }, 1000);
    });
  }
}
