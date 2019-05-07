import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Bookshelves';
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyCJT7Hdn1s__7xq30ZaNKUCUYhVAUDb8O4",
      authDomain: "bookshelves-30f59.firebaseapp.com",
      databaseURL: "https://bookshelves-30f59.firebaseio.com",
      projectId: "bookshelves-30f59",
      storageBucket: "bookshelves-30f59.appspot.com",
      messagingSenderId: "837659915947",
      appId: "1:837659915947:web:f62879e64e20af91"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
