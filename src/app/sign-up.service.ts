import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  url:string="http://localhost:8080";
  private httpClient:HttpClient

  constructor(private httpBackened:HttpBackend) { }

  SignUp(user:User):Observable<User>{
    this.httpClient=new HttpClient(this.httpBackened);
    return this.httpClient.post<User>(this.url+"/signup",user);
  }

}
