import { Component, OnInit, EventEmitter, Output,Input } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DataService]
})

export class HeaderComponent implements OnInit {
  fileData:any;
  searchString:string;
  fileStatus:string = 'Upload';
  disableUploadBtn:boolean = false;

  @Output() SearchUnit = new EventEmitter<any>();
  @Output() SearchAllUnits = new EventEmitter<any>();
  @Input() searchResult:Number = 1;

  constructor(private dataService: DataService) {
    this.fileData = '';
    this.searchString = "";
  }

  ngOnInit(): void { }

  keyPressHandler(evt:any){
    if(evt.key == 'Enter'){
      this.searchClkHandler();
    }
  }

  searchClkHandler() {
    if(this.searchString.length>=2){
      this.SearchUnit.emit(this.searchString);
    }
  }

  searchAllUnits(){
    this.SearchAllUnits.emit();
  }

  searchChange(event:any) {
    this.searchString = event.target.value;
  }

  fileChange(event:any){
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let formData = new FormData();
      formData.append('file', fileList[0], fileList[0].name);
      formData.append('info', JSON.stringify({name:"upload", value:""}));
      this.fileData = formData;
      this.fileStatus = 'Uploading...';
      this.disableUploadBtn = true;
      this.dataService.uploadFile(this.fileData).subscribe(msg=>{
        setTimeout(()=>{
          this.fileStatus = 'Upload';
          this.disableUploadBtn = false;
        }, 1000);
      })
    }
  }
}
