import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from '../common/product';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {
  @Input() dataList:Product[] = [];
  @Input() logo:string = '';
  @Input() campaignName:string = '';
  @Input() serverPath:string = '';
  
  @Output() ProductClicked = new EventEmitter<any>();

  constructor() { }
  ngOnInit(): void { }

  isImage():boolean{
    return this.logo.search(/(.png|.jpg|.svg)/) != -1?true:false;
  }

  onProductClick(obj:any): void {
    this.ProductClicked.emit(obj);
  }
}
