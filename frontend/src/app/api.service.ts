import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apisJsonFilePath = "assets/apis.json";
  apis = {
    "base_url":"http://localhost:8080/backend",
    "signin": {
        "url":"/signin"
    },
    "registration": {
        "url":"/registration"
    },
    "order_blotter": {
      "url": ""
    },
    "trade_blotter": {
      "url": ""
    }
  };

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) {}

  postRequest(url:string, body:any) {
    const options = {
      "headers": new HttpHeaders({"Authorization": "Bearer " + this.session.accessToken})
    };
    return this.http.post(this.apis["base_url"] + url, body, options);
  }

  getRequest(url:String, params:any) {
    const options = {
      "headers": new HttpHeaders({"Authorization": "Bearer " + this.session.accessToken}),
      "params": new HttpParams(params)
    };
    return this.http.get(this.apis["base_url"] + url, options);
  }

}
