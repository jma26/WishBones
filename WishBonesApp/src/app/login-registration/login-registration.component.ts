import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  registration: FormGroup;
  fullName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  alias: FormControl;


  constructor(private _registerService: RegisterService, private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    // 2-way binding
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

  // Create FormControls as part of component properties
  createFormControls() {
    this.fullName = new FormControl('', Validators.required),
    this.email = new FormControl('', Validators.required),
    this.alias = new FormControl('', Validators.required),
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]),
    this.confirmPassword = new FormControl('', Validators.required)
  }

  // Bind FormControls to FormGroup model as properties
  createForm() {
    this.registration = new FormGroup({
      fullName: this.fullName,
      email: this.email,
      alias: this.alias,
      password: this.password,
      confirmPassword: this.confirmPassword
    })
  }

  register() {
    console.log('Registration at login-registration component pinging');
    if (this.registration.invalid) {
      console.log(this.registration.value);
      console.log('Form unsuccessfully submitted- Invalid fields present');
    // IF above is good, proceed to create register new user
    } else {
      console.log('Form successfully submitted- Valid fields present');
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




}
