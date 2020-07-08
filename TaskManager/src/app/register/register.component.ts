import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,NgForm,NgModel} from '@angular/forms';
import { reg } from '../Models/reg.model';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  email = new FormControl('', [Validators.email,Validators.required]);
  pass = new FormControl('', [Validators.required,Validators.minLength(6)]);
  repass = new FormControl('', [Validators.required]);

  regEmail:string;
  regPass:string;
  regRePass:string;

  rePassError:any;
  passError:any;
  emailError:any;

  r:reg =new reg();

  constructor(private service:ApiService, private router:Router) { }

  ngOnInit() {
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

  getRepassErrorMessage(){
    if (this.email.hasError('required')) {
      return 'You must confirm your password';
    }
  }

  onSubmit() {
    
    this.r.Email = this.regEmail;
    this.r.Password =this.regPass;
    this.r.ConfirmPassword = this.regRePass;

    this.service.postRegister(this.r).subscribe(
      (things:any) => {
        console.log(things);
        this.router.navigate(['/login']);
      },
      (error:HttpErrorResponse) => {
        console.log(error);
        this.rePassError = error.error.ModelState["model.ConfirmPassword"]
        this.passError = error.error.ModelState["model.Password"]
        this.emailError = error.error.ModelState["model.Email"]
        alert("This email is already registered!")
      },
    );
    //debugger;
  }

}