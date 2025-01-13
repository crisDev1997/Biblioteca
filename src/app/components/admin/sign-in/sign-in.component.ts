import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms'

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  signinForm!: FormGroup;

  constructor(private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.signinForm=this.createFormGroup();
  }
  createFormGroup(): FormGroup{
    return new FormGroup({
      correo:new FormControl("",[Validators.required,Validators.minLength(2),Validators.email]),
      pass:new FormControl("",[Validators.required,Validators.minLength(2)])
    })
  }
  signin():void{
    this.authService.signin(this.signinForm.value.correo,this.signinForm.value.pass).subscribe((msg)=>{
      const p=JSON.parse(JSON.stringify(msg))
      const id_admin=String(p["data"][0]["id_admin"]);
      localStorage.setItem("id_admin",id_admin);
      
    })
  }
 
}
