import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../auth/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  store:any;

constructor(  private authService:FirestoreService){}
ngOnInit(){
  this.authService.userSub.subscribe(user=>{
    console.log(user);
    this.store=user
  })
}
}
