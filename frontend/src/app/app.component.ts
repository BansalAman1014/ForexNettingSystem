import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'frontend';
  message:JSON;

  constructor(private apiService: ApiService) {

  }

  login(email:String, password:String) {
    let loginUrl = this.apiService.apis.signin.url;
    let body = {
      "email": email,
      "password": password
    }
    this.apiService.post(loginUrl, body).subscribe((data:JSON) => this.message=data);
  }
}
