import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  response:JSON;
  errors:JSON;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(firstname:String, lastname:String, email:String, password:String) {
    let loginUrl = this.apiService.apis.registration.url;
    let body = {
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "password": password
    }
    this.apiService.post(loginUrl, body).subscribe(
      (data:JSON) => {
        this.response=data;
        this.router.navigate(['login']);
      }, 
      (error:any) => {
        console.log(error);
        this.errors = error;
        ;
      }
    );
  }

}
