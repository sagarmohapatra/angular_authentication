import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  idToken: any;
  email: any;
  refreshToken: any;
  expiresIn: any;
  localId: any;

  constructor(private http: HttpClient) {}
  isLoggedIn = false;
 
  signup(email: string, password: string): Observable<any> {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByah49euVrS1uh_XEmUI-oQW7Aa9HYEMY`,
      { email, password, returnSecureToken: true }
    );
  }
  login() {
    this.isLoggedIn = true;
  }
  logout() {
    this.isLoggedIn = false;
  }
  isAuthentication() {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove(this.isLoggedIn);
        
      }, 1000);
    });
  }
}
