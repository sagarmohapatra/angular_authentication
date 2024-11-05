import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Method to add a new data object to a specific collection and subcollection
   addUserAuth(data: any): Promise<void> {
    const authRef = this.firestore.collection('user_details/auth'); // Ensure 'auth' is a collection
    return authRef.add(data).then(() => {
      console.log('User added successfully to user_details/auth!');
    }).catch(error => {
      console.error('Error adding user: ', error);
    });
  }
}
