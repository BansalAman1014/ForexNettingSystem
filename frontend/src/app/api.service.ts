import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    "orderblotter": {
      "url":"http://rohithvutnoor.info/data.json"
    },
    "tradeblotter": {
      "url":"http://rohithvutnoor.info/tradeData.json"
    }
  };

  constructor(private http: HttpClient) {}

  post(url, body) {
    return this.http.post(this.apis["base_url"] + url, body);
  }

  getRequest(url, queryParams) {
    return this.http.get(url);
  }

}
