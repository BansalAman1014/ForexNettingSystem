import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forexapp';

  // constructor(private apiService: ApiService) {
  //
  // }

}
// register(fname:String , lname:String , email:String , password:String) {
//   console.log(email);
//   console.log(fname);
//   console.log(lname);
//   let registerUrl = this.apiService.apis.register.url;
//   console.log(registerUrl);
//   let body = {
//     "fname":fname,
//     "lname":lname,
//     "email": email,
//     "password": password
//   }
//   this.apiService.post(registerUrl, body).subscribe((data:any) => this.message.push(data));
// }
