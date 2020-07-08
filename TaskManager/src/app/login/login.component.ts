import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,NgForm,NgModel} from '@angular/forms';
import { login } from '../Models/login.model';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  l:login =new login();
  email = new FormControl('', [Validators.email,Validators.required]);
  pass = new FormControl('', [Validators.required,Validators.minLength(6)]);


  logEmail:string;
  logPass:string;

  
  constructor(private service:ApiService,private router:Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userToken')!=undefined){
      this.router.navigate(['/task']);
      console.log(sessionStorage.getItem('userToken'));
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }
    else if(this.email.hasError('email')){
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
  }

  getPassErrorMessage(){
    if (this.pass.hasError('required')) {
      return 'You must enter a password';
    }
    else if(this.pass.hasError('minlength')){
      return 'Password must be more than 6 characters ';
    }
  }

  onSubmit() {
    
    this.l.userName = this.logEmail;
    this.l.Password =this.logPass;

    //this.service.postLogin(this.l)
    
    this.service.postLogin(this.l).subscribe(
      (data:any) => {
        console.log(data.access_token);
        sessionStorage.setItem('userToken',data.access_token);
        this.router.navigate(['/task']);
      },
      (error:HttpErrorResponse) => {
        console.log(error);
        alert("Email/Password Incorrect!");
      },
      
    );
    //debugger;
  }

}
