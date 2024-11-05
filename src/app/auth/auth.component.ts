import { Component } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { FirestoreService } from './firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent {
  isLoginMode: any = true;
 constructor(private firestoreService: FirestoreService){

 }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onFormSubmit(authForm: NgForm) {
    // this.addNewData(authForm);
    
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
