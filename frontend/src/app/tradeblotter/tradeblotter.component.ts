import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
@Component({
  selector: 'app-tradeblotter',
  templateUrl: './tradeblotter.component.html',
  styleUrls: ['./tradeblotter.component.css']
})
export class TradeblotterComponent implements OnInit {
  tradeData = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getRequest(this.apiService.apis.trade_blotter.url, '').subscribe(data => {
      //this.data = data;
      this.tradeData  = JSON.parse(JSON.stringify(data));
      console.log(this.tradeData);
    });
  }

}
