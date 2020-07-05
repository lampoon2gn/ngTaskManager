import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,NgForm,NgModel} from '@angular/forms';
import { reg } from '../Models/reg.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  email = new FormControl('', [Validators.email,Validators.required]);
  pass = new FormControl('', [Validators.required]);
  repass = new FormControl('', [Validators.required]);

  regEmail:string;
  regPass:string;
  regRePass:string;

  r:reg =new reg();

  constructor(private service:ApiService) { }

  ngOnInit() {
  }


  onSubmit() {
    
    this.r.Email = this.regEmail;
    this.r.Password =this.regPass;
    this.r.ConfirmPassword = this.regRePass;

    this.service.postRegister(this.r).subscribe((things) => {
      console.log(things);
      
    });
    debugger;
  }

}