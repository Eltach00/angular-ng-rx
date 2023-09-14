import { Component } from '@angular/core';
// import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-blog';

  // ngOnInit(): void {
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   console.log(jwt_decode(token))
    // }
  // }
}
