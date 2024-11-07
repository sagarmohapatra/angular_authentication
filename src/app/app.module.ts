import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';

// const firebase = {
//   apiKey: "AIzaSyByah49euVrS1uh_XEmUI-oQW7Aa9HYEMY",
//   authDomain: "AuthAngular.firebaseapp.com",
//   projectId: "authangular-5132a",
//   storageBucket: "user_details",
//   messagingSenderId: "105769965545",
//   appId: "105769965545"
// }
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // AngularFireModule.initializeApp(firebase), // use your Firebase config
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
