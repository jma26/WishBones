import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing/app-routing.module';

// Services
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [RegisterService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
