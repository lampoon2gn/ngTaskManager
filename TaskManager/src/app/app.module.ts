import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { TaskComponent,} from './task/task.component';
import {HttpClientModule} from '@angular/common/http'; 
import { MaterialModule } from './material.module'
import { ApiService } from './api.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { upsertComponent,DialogOverviewExampleDialog} from './upsert/upsert.component';
import { RegisterComponent } from './register/register.component'




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskComponent,
    upsertComponent,
    DialogOverviewExampleDialog,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
