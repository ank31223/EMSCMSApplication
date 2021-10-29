import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtIntercepterService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req=req.clone();

    var currentUser={token:"",user:""};

    if(sessionStorage.currentUser!=null){
      currentUser=JSON.parse(sessionStorage.currentUser);
    }
     req=req.clone({
       setHeaders:{
         Authorization:"Bearer "+currentUser.token
       }
     });

     return next.handle(req);

  }
}