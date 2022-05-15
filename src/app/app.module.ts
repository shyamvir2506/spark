import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { MainComponent } from './main/main.component';

import { MessageService } from './message.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    ProductListComponent,
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    LeftPanelComponent,
    RightPanelComponent
  ],
  imports: [ClipboardModule, BrowserModule, HttpClientModule, BrowserAnimationsModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatGridListModule, MatInputModule],
  providers: [MessageService, HttpErrorHandler],
  bootstrap: [AppComponent]
})

export class AppModule { }
