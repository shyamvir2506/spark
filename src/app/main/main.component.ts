import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { isThisTypeNode } from 'typescript';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => active', [ // using status here for transition
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MainComponent implements OnInit, AfterViewInit {
  data:any;
  videoCss:any = {};
  tabIndex:number = 0;
  imgIndex:number = 0;
  showMsg:boolean=false;
  totalImages:number = 0;

  @Input() campaignName:string ='';
  @Input() serverPath:string = '';
  
  @Input() win:any = '';
  @ViewChild('mainContainer', { static: false }) mainContainer!:ElementRef;
  @ViewChild('videoHolder', { static: false }) videoHolder!:ElementRef;
  @ViewChild('copyBtn', { static: false }) copyBtn!:ElementRef;
  @ViewChild('loader', {static:false}) loader!:ElementRef;
  @ViewChild('unitContainer', {static:false}) unitContainer!:ElementRef;
  @ViewChild('leftNav',{static:false}) leftNav!:ElementRef;
  @ViewChild('rightNav',{static:false}) rightNav!:ElementRef;

  constructor() { }
  ngOnInit(): void {  }
  public ngAfterViewInit(): void { }

  naviHandler(val:number):void{
    this.tabIndex += val;
    this.imgIndex = 0;

    //pause the video if user change the tab //
    this.tabIndex !== 0 && this.videoHolder?.nativeElement.pause();

    if(this.tabIndex >= this.data.tabs.length){
      this.tabIndex = 0;
    }else if(this.tabIndex < 0){
      this.tabIndex = this.data.tabs.length-1;
    }
  }

  galleryHandler(val:number):void{
    this.imgIndex += val;
    if(this.imgIndex >= this.data.tabs[this.tabIndex].length){
      this.imgIndex = 0;
    }else if(this.imgIndex < 0){
      this.imgIndex = this.data.tabs[this.tabIndex].length-1;
    }
  }

  copyHandler():void{
    let scope = this;
    this.showMsg = true;
    setTimeout(function(){ scope.showMsg = false; }, 2000);
  }

  allImgLoder(evt:any):void{
    this.totalImages -= 1;
    if(this.totalImages<=0){
      //hide loader//
      this.loader.nativeElement.style.visibility = "hidden";
      this.unitContainer.nativeElement.style.visibility = "visible";
    }
  }

  selected(unitData:any){
    if(unitData==undefined) return;
    let copyBtnPos = {x:'0px',y:'0px'};

    //show loader and hide unit container initially//
    setTimeout(()=>{
      this.loader.nativeElement.style.visibility = "visible";
      this.unitContainer.nativeElement.style.visibility = "hidden";
    }, 10);

    this.data = unitData;
    
    if(this.data.tabs.length === 1){
      this.leftNav.nativeElement.style.visibility="hidden";
      this.rightNav.nativeElement.style.visibility="hidden";
    }
    this.data.size = this.data.type.replace(/\s/g) === "mobileexpandable" ? '414x635' : this.data.size;
    console.log(this.data);
    this.data.tabs.forEach((timgarr:any) => {
      timgarr.forEach(()=>{
        this.totalImages += 1;
      })
    });
    
    let suffix = this.data.type.search('mobile')!==-1 ? ' mcls-' : 'cls-';
    this.mainContainer?.nativeElement.setAttribute('class', 'main-container '+ suffix + this.data.size);
    let ht = this.data.type.toLowerCase().replace(/\s/g, '') === 'desktopexpandable' ? 546 : Number(this.data.size.split('x')[1]);
    let wt = Number(this.data.size.split('x')[0])+100;//adding 100 for arrow buttons combined with//
    
    let mleft =  0;
    if(this.data.type.toLowerCase().replace(/\s/g, '').search('mobile') === -1  && this.data.size.split('x')[0] !== '970' && this.data.size.split('x')[0] !== '728'){
      mleft = 970-wt;
    }
    
    this.mainContainer?.nativeElement.setAttribute('style', 'height:'+ ht + 'px; align-items:center; width:'+wt+'px; margin-left:'+mleft+'px;');
    this.videoHolder?.nativeElement.setAttribute('muted', true);
    this.videoHolder?.nativeElement.setAttribute('autoplay', true);
    this.videoHolder?.nativeElement.play();

    switch(this.data.type.toLowerCase().replace(/\s/g, '')){
      case "desktopexpandable":
        this.videoCss.width = 640;
        this.videoCss.height = 360;
        this.videoCss.left = 0;
        this.videoCss.top = 80;
        copyBtnPos.y = '546px';
        copyBtnPos.x = '900px'
        break;
      
      case "mobileexpandable":
        this.videoCss.width = 300;
        this.videoCss.height = 243;
        this.videoCss.left = 0;
        this.videoCss.top = 80;
        break;

      case "desktopinframe":
        switch(this.data.size){
            case '970x250':
              this.videoCss.width = 412;
              this.videoCss.height = 232;
              this.videoCss.left = 8;
              this.videoCss.top = 8;
              break;

            case '300x250':
              this.videoCss.width = 300;
              this.videoCss.height = 169;
              this.videoCss.left = 0;
              this.videoCss.top = 38;
              break;

            case '300x600':
              this.videoCss.width = 300;
              this.videoCss.height = 169;
              this.videoCss.left = 0;
              this.videoCss.top = 38;
              break;

            case '160x600':
              this.videoCss.width = 160;
              this.videoCss.height = 90;
              this.videoCss.left = 0;
              this.videoCss.top = 37;
              break;

            case '728x90':
              this.videoCss.width = 155;
              this.videoCss.height = 87;
              this.videoCss.left = 0;
              this.videoCss.top = -2;
              break;
        }

        break;

      case "mobileinframe":
        switch(this.data.size){
          case '300x250':
            this.videoCss.width = 300;
            this.videoCss.height = 169;
            this.videoCss.left = 0;
            this.videoCss.top = 38;
            break;

          case '300x600':
            this.videoCss.width = 300;
            this.videoCss.height = 169;
            this.videoCss.left = 0;
            this.videoCss.top = 38;
            break;
        }
        break;

      case "mobileinstream":
        break;

      case "desktopinstream":
        this.videoCss.width = 640;
        this.videoCss.height = 360;
        this.videoCss.left = 0;
        this.videoCss.top = 80;
        break;
    }

    //this.copyBtn?.nativeElement.setAttribute('style','margin-top:'+copyBtnPos.y+'; margin-left:'+copyBtnPos.x);
  }
}
