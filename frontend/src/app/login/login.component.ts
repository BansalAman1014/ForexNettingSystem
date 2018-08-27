import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response:JSON;
  errors:JSON;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  login(email:String, password:String) {
    let loginUrl = this.apiService.apis.signin.url;
    let body = {
      "email": email,
      "password": password
    }
    this.apiService.post(loginUrl, body).subscribe(
      (data:JSON) => {
        this.response=data;
        this.router.navigate(['dashboard']);
      }, 
      (error:any) => {
        console.log(error);
        this.errors = error;
      }
    );
  }

}
