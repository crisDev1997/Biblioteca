import { Component, OnInit, Output, ViewChild , EventEmitter} from '@angular/core';
import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { Router } from '@angular/router';

import {  first } from 'rxjs/operators';

import { User } from 'src/app/modules/User';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Output() create: EventEmitter<any>=new EventEmitter();
  form!: FormGroup;
  isOpen=false;

  constructor( private userService:UserService, private router:Router) {

   }

  ngOnInit(): void {
    this.form=this.createFormGroup();
   
  }
  createFormGroup():FormGroup{
    return new FormGroup({
      ci:new FormControl("",[Validators.required,Validators.minLength(7)]),
      nombres:new FormControl("",[Validators.required,Validators.minLength(4)]),
      apellidos:new FormControl("",[Validators.required,Validators.minLength(3)]),
      fec_nac:new FormControl("",[Validators.required,Validators.minLength(2)]),
      num_telf:new FormControl("",[Validators.required,Validators.minLength(2)]),
      correo:new FormControl("",[Validators.required,Validators.minLength(2),Validators.email]),
    })
  }
  onSubmit(formData:Omit<User,"id">):void{
    
    this.userService.createUser(formData).pipe(first()).subscribe((data)=>{
      const message1: HTMLElement | null = document.getElementById('message');
      console.log(data)
      const jsondata=JSON.stringify(data)
      if(message1 && jsondata.includes('invalid_message')){
        
        message1.innerHTML=""
        const p =document.createElement("p");
        const iniMessage=JSON.stringify(data).search('invalid_message":')+18
        const endMessage=JSON.stringify(data).search('!')+1
        const sliced=jsondata.slice(iniMessage,endMessage)
        p.textContent=sliced
        message1.appendChild(p)
      }else{
        this.create.emit(null);
        this.router.navigate(["users/users-list"])
      }
      
    })
    
  }
}
