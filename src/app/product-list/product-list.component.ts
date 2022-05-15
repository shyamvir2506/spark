import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() data!:Product;
  @Output() clicked = new EventEmitter<any>();

  constructor() { }
  ngOnInit(): void { }

  clickHandler(evt:any): void {
    var target = evt.target || evt.currentTarget;
    for(let j=0; j<this.data.units.length; j++){
      let unit = {index:-1, type:''};
      if(this.data.units[j].size === target.attributes.id.value.split('_')[1]){
        unit.type = this.data.type;
        unit.index = j;
        this.clicked.emit(unit);
        break;
      }
    }
  }

  productClickHandler(evt:any):void {
    //f(evt.target.innerHTML === 'desktop expandable' || evt.target.innerHTML === 'mobile expandable'){
      let unit = {index:0, type:this.data.type}
      this.clicked.emit(unit);
    //}
  }
}
