import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from './login';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://localhost:8080";
  user: User;
  currentUser: { "token", "user" };
  currentUserName: string = null;
  currentUserFullName: string = null;
  currentUserRole: string = null;

  private httpClient: HttpClient;

  constructor(private httpBackened: HttpBackend, private jwthelperService: JwtHelperService) { }



  public login(login: Login): Observable<any> {

    this.httpClient = new HttpClient(this.httpBackened);

    return this.httpClient.post(this.url + "/login", login).pipe(map(
      (res) => {
        sessionStorage.currentUser = JSON.stringify(res);
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        this.currentUserFullName = this.currentUser.user.fullName;
        this.currentUserName = this.currentUser.user.username;
        this.currentUserRole = this.currentUser.user.role;

        console.log(this.currentUser);
        console.log(this.currentUser.user.username);
        console.log(this.currentUser.user.fullName);
        console.log(this.currentUser.user.role);


      }
    ));
  }

  public logout() {
    sessionStorage.removeItem("currentUser");
    this.currentUserFullName = null;
    this.currentUserName = null;
    this.currentUserRole = null;
    console.log("logout clickeed");
  }

  public isAuthenticated(): boolean {

    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).token : null;

    console.log("this is token " + token);

    if (token && this.jwthelperService.isTokenExpired()!=true) {
      return true;
    } else {
      console.log("true")
      false;
    }

  }
}
