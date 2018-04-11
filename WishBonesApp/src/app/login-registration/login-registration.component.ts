import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {
  newUser: any;
  user: any;
  loginFieldBoolean: any;
  errors: any;

  constructor(private _registerService: RegisterService, private _loginService: LoginService, private router: Router) { }

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
    this.loginFieldBoolean = {
      emailField: false,
      passwordField: false,
      errorDisplay: false
    }
  }

  login() {
    console.log('Login at login-registration component pinging');
    // Check if email field or password field is empty
    if (this.user.email === '' && this.user.password === '') {
      this.loginFieldBoolean.errorDisplay = false;
      this.loginFieldBoolean.emailField = true;
      this.loginFieldBoolean.passwordField = true;
    // Check if email field is empty
    } else if (this.user.email === '') {
      this.loginFieldBoolean.errorDisplay = false;
      this.loginFieldBoolean.passwordField = false;
      this.loginFieldBoolean.emailField = true;
      console.log('Email Field is empty');
    // Check if password field is empty
    } else if (this.user.password === '') {
      this.loginFieldBoolean.errorDisplay = false;
      this.loginFieldBoolean.emailField = false;
      this.loginFieldBoolean.passwordField = true;
      console.log('Password Field is empty');
    // If above is good, proceed to validate login information
    } else {
      this.loginFieldBoolean.emailField = false;
      this.loginFieldBoolean.passwordField = false;
      let observable = this._loginService.loginUser(this.user);
      observable.subscribe(data => {
        console.log('Observable data he re ', data);
        if (data['error'] && data['success'] === false) {
          this.loginFieldBoolean.errorDisplay = true;
          this.errors = data['error'];
        } else if (data['profile'] && data['success'] === true) {
          this.router.navigate(['/home']);
        }
      })
    }
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
          // Return registered user's information
          console.log(data);
          console.log('Successful creation');
        }
      })
    }
  }



}
