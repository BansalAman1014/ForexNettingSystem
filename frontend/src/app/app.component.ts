import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'frontend';
  message = [];

  constructor(private apiService: ApiService) {

  }

  login(email:String, password:String) {
    console.log(email);
    console.log(password);
    let loginUrl = this.apiService.apis.login.url;
    console.log(loginUrl);
    let body = {
      "email": email,
      "password": password
    }
    this.apiService.post(loginUrl, body).subscribe((data:any) => this.message.push(data));
  }
}
