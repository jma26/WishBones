import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {
  newUser: any;
  user: any;

  constructor(private _registerService: RegisterService) { }

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
     console.log('Login detected' + this.user);
     console.log(this.user.email, this.user.password);
   }

   registration() {
     console.log('Registration at login-registration component pinging');
     let observable = this._registerService.registerUser(this.newUser);
     observable.subscribe(data => {
       console.log(data);
       if (data['errors']) {
         console.log(data['errors']);
       } else {
         console.log('Successful creation');
       }
     })
   }



}
