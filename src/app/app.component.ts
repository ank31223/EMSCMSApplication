import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navbarCollapsed = true;
  title = 'EmsCmsApplication';

  constructor(public loginService:LoginService,private router:Router){

  }

  onLogoutClick(){
    this.loginService.logout();
    this.router.navigate(["/home"]);
  }
}
