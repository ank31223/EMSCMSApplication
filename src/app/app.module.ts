import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { JwtIntercepterService } from './jwt-intercepter.service';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    ClientComponent,
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return (sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")).token:null)
        }
      }
    })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtIntercepterService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
