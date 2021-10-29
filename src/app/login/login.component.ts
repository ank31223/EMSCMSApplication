import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(private loginService: LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  onLoginClick() {

    

    this.loginService.login(this.login).subscribe(
      (response)=>{
        this.router.navigate(["/home"]);

      },
      (error)=>{
        alert("Authentication failed");

      }
    );



  }


}
