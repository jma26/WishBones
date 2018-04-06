import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {
  newUser: any;
  user: any;
  constructor() { }

  ngOnInit() {
    // 2-way binding
    this.newUser = {
      alias: '',
      fname: '',
      lname: '',
      email: '',
      password: '',
      passwordconfirm: ''
    }
    this.user = {
      email: '',
      password: ''
    }
   }

}
