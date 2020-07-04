import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { TaskComponent,} from './task/task.component';
import {HttpClientModule} from '@angular/common/http'; 
import { MaterialModule } from './material.module'
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';
import { upsertComponent,DialogOverviewExampleDialog} from './upsert/upsert.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskComponent,
    upsertComponent,
    DialogOverviewExampleDialog

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
