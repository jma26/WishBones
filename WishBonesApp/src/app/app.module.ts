import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { RegisterService } from './services/register.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';

const appRoutes: Routes = [
  {path: '', component: LoginRegistrationComponent },
  {path: 'home', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
