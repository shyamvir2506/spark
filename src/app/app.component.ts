import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from './data.service';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})

export class AppComponent implements OnInit {
  dataList:any[];
  selectedProduct:string;
  selectedIndex:number;
  searchResult:number;
  units: string[];
  unitLogo:string;
  campaignName:string;
  win:any;
  serverPath:string = 'http://localhost:80/spark/client';
  @ViewChild(MainComponent) mainComponent?:MainComponent;

  constructor(private dataService: DataService) {
    this.dataList = [];
    this.units = [];
    this.selectedProduct = 'desktop expandable';
    this.selectedIndex = 0;
    this.searchResult = 1;
    this.unitLogo = '';
    this.campaignName = '';
    this.win = window;
  }

  ngOnInit() { this.getData(); }

  getSelectedData():any {
    for(let j=0; j<this.dataList.length; j++){
      if(this.dataList[j].type === this.selectedProduct){
        return { ...this.dataList[j].units[this.selectedIndex], type:this.selectedProduct};
      }
    }
  }

  productSelected(obj:any):void{
    this.units = [];
    this.selectedIndex = obj.index;
    this.selectedProduct = obj.type;
    this.mainComponent?.selected(this.getSelectedData());
  }

  searchAllUnits():void {
    this.dataService.searchAllUnits().subscribe(arr => {
      this.units = arr;
    })
  }

  getData(): void {
    this.units = [];
    this.dataService.searchUnit(this.win.units || 'latest').subscribe(data => {
      if(data[0]){
          this.dataList = data[0].products;
          this.searchResult = data[0].name.length;
          this.campaignName = data[0].name;
          this.serverPath = data[0].path.search('exponential')!==-1 ? data[0].path.split('exponential')[1] : this.serverPath;
          this.unitLogo = (data[0].logo.length>=2) ? data[0].logo : data[0].name;
          
          let scope = this;
          setTimeout(function(){
            if(scope.mainComponent){
              scope.mainComponent.selected(scope.getSelectedData());
            }
          }, 400);
      }
    })
  }
}
