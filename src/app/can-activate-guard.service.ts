import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(private loginService:LoginService,private router:Router,private jwthelperService:JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
   
    var token=sessionStorage.getItem("currentUser")?  JSON.parse(sessionStorage.getItem("currentUser")).token:null;

    console.log(this.jwthelperService.decodeToken(token));
    

    if(this.loginService.isAuthenticated() && this.jwthelperService.decodeToken(token).role==route.data.expectedRole){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }

  }


}
