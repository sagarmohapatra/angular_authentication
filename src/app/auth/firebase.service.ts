import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
// import { User } from './user.model';
import { User } from './user.model';
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
  isLoggedIn = false;
  userSub = new Subject<User>(); /////////
  constructor(private http: HttpClient) {
    // console.log(this.userSub.next);
  }

  signup(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByah49euVrS1uh_XEmUI-oQW7Aa9HYEMY`,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }
  login(email: string, password: string): Observable<any> {
    // this.isLoggedIn = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByah49euVrS1uh_XEmUI-oQW7Aa9HYEMY`,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }
  private handleUser(response: any) {
    const expireDate = new Date(
      new Date().getTime() + +response.expiresIn * 10000
    );
    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expireDate
    );
    console.log(user.email);

  this.userSub.next(user)
    console.log("dashbord",this.userSub.next(user));
    
  }
  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Error Ocurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already Exist ';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
    }
    return throwError(errorMessage);
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
