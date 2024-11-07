import { Component } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { FirestoreService } from './firebase.service';
import { Observable } from 'rxjs';
 
// import { AuthResponseData } from '../auth/auth-response.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent {
  isLoginMode: any = true;
  isLoading = false;
  error: any;
   authObs:any= Observable<any>;

  constructor(private authService: FirestoreService) {}
  
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onFormSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    this.isLoading = true;
   
    if (this.isLoginMode) {
      this.authObs= this.authService.login(
        authForm.value.email,
        authForm.value.password
      );
      // .subscribe();
    } else {
      this.authObs = this.authService.signup(
        authForm.value.email,
        authForm.value.password
      );
     
    }
    this.authObs.subscribe(
        (response: any) => {
          console.log(response);
          this.isLoading = false;
        },  
        (errorMessage: any) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
    )
  }



  // alternative way of validation other validattion of gamil in html file
  getPasswordErrors(password: FormControl | NgModel): any {
    if (password?.errors?.['required']) {
      return 'password is Required';
    } else if (password?.errors?.['minlength']) {
      return 'password should be of 6 characters length';
    }
  }

  // addNewData(obj:any) {

  //   this.firestoreService.addUserAuth(obj).then(() => {
  //     console.log('Data added successfully to user_details/auth!');
  //   }).catch((error:any) => {
  //     console.error('Error adding data: ', error);
  //   });
  // }
}
