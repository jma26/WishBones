import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {
  newUser: any;
  user: any;

  constructor(private _registerService: RegisterService, private _loginService: LoginService) { }

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

  login() {
    console.log('Login at login-registration component pinging');
    let observable = this._loginService.loginUser(this.user);
  }

  registration() {
    console.log('Registration at login-registration component pinging');
    // Check if password field is empty
    if (this.newUser.password === '') {
        console.log('Password field is empty');
    // Check if passford and confirm password match
    } else if (this.newUser.password !== this.newUser.passwordconfirm) {
      console.log('Password does not match');
    } else if (this.newUser.password.length < 5) {
      console.log('Password must be 5 characters long');
    // IF above is good, proceed to create register new user
    } else {
      let observable = this._registerService.registerUser(this.newUser);
      observable.subscribe(data => {
        console.log(data);
        if (data['errors']) {
          console.log(data['errors']);
        } else {
          console.log(data);
          console.log('Successful creation');
        }
      })
    }
  }



}
