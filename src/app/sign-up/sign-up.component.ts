import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../sign-up.service';
import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user:User=new User();
  confirmPassword:string;

  constructor(private signUpService:SignUpService,private router:Router) { }



  ngOnInit(): void {
  }

  onSignInClick(){

    this.signUpService.SignUp(this.user).subscribe(
      (response)=>{
        this.router.navigate(["/login"]);
      },
      (error)=>{

      }
    );



  }

}
