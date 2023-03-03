import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Users } from '../models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  models!:Users;
  submitted:boolean=false;
  isLoginMode:boolean=true;
  interval:number=5000;
  error='';
  readonly apiUrl="http://localhost:3000";

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private http:HttpClient,
    public router:Router,
    ){}

  get f(){ return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      'email':new FormControl("",[Validators.required]),
      'password':new FormControl("",[Validators.required,Validators.minLength(6)])
    })
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }



  onSubmit(){
    this.submitted=true;
    console.log(this.loginForm.value)

      this.models=this.loginForm.value;

    if(this.loginForm.invalid){
      return;
    }

    this.http.get(this.apiUrl+'/token/sign').subscribe((res:any)=>{
      if(this.models.email=='pranav@gmail.com' && this.models.password=='123456'){
      if(res['token']){
        console.log(this.loginForm.value)
        this.router.navigate(['/home']);
        localStorage.setItem(this.loginForm.value,res['token']);
        console.log();
        setInterval(()=>{
          localStorage.clear();
          this.router.navigate(['/']);
        },200000)

      }
    }
    else{
      window.alert("Please enter valid credential..!");
    }
    })

    this.loginForm.reset();

  }
}
