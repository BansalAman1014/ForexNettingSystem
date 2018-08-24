import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response:JSON;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  
  login(email:String, password:String) {
    let loginUrl = this.apiService.apis.signin.url;
    let body = {
      "email": email,
      "password": password
    }
    this.apiService.post(loginUrl, body).subscribe(
      (data:JSON) => this.response=data, 
      (error:any) => console.log(error)
    );
  }

}
