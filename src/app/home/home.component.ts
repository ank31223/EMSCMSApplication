import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {

  constructor(public loginService:LoginService) { 

    // if(sessionStorage.getItem("currentUser")){
    //   sessionStorage.removeItem("currentUser");
    // }
    
  }

  ngOnInit(): void {
    
  }

}
