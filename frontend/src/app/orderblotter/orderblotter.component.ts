import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
@Component({
  selector: 'app-orderblotter',
  templateUrl: './orderblotter.component.html',
  styleUrls: ['./orderblotter.component.css']
})
export class OrderblotterComponent implements OnInit {
  data = [];
  constructor(
    private apiService: ApiService
   ) { }
  
  ngOnInit() {
    this.apiService.getRequest(this.apiService.apis.order_blotter.url, '').subscribe(data => {
    //this.data = data;
    this.data  = JSON.parse(JSON.stringify(data));
    console.log(this.data);
  });

  }

}
