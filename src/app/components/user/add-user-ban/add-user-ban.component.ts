import { Component, OnInit, Output, ViewChild , EventEmitter} from '@angular/core';
import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

import {  first } from 'rxjs/operators';


import { Observable } from 'rxjs';


import { UserData} from 'src/app/modules/User';
import { Sanction } from 'src/app/modules/Sanction';
import { UserService } from 'src/app/services/user.service';
import { SanctionService } from 'src/app/services/sanction.service';
@Component({
  selector: 'app-add-user-ban',
  templateUrl: './add-user-ban.component.html',
  styleUrls: ['./add-user-ban.component.css']
})
export class AddUserBanComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Output() create: EventEmitter<any>=new EventEmitter();
  form!: FormGroup;
  user$!:Observable<UserData[]>;
  notReturned!:boolean;
  EndBanDate!:boolean;

  constructor(private userService:UserService, private router:Router, private accessId: ActivatedRoute, private sanctionService:SanctionService) { }
  ngOnInit(): void {
    let ci=String(this.accessId.snapshot.paramMap.get('ci'));
    this.user$=this.userService.getUser(ci);
    this.form=this.createFormGroup()
    this.notReturned=false;
    this.EndBanDate=false;
    this.user$.subscribe(data=>{
      const currentDate=new Date(Date.now()).toISOString().split("T")[0];
      this.form.setValue({id_usuario:data[0].id,id_devolucion:0,razon_sancion:'',fecha_sancion:currentDate,fecha_fin_sancion:null})
    })
    
    
  }
  createFormGroup():FormGroup{
    return new FormGroup({
      id_usuario:new FormControl("",[Validators.required,Validators.minLength(7)]),
      id_devolucion:new FormControl("",[Validators.required,Validators.minLength(4)]),
      razon_sancion:new FormControl("",[Validators.required,Validators.minLength(3)]),
      fecha_sancion:new FormControl("",[Validators.required,Validators.minLength(2)]),
      fecha_fin_sancion:new FormControl("",[Validators.minLength(2)]),
    })
  }
  onSubmit(formData:Omit<Sanction,"id">):void{
      
      this.sanctionService.addUserSanction(formData).subscribe(data=>{
        console.log(data)
        this.router.navigate(['users/users-list'])
      })
  }
  ChangeReturn():void{
    let bool=this.notReturned;
    if(bool){
      let btn=document.getElementsByClassName("ButtonDev")[0];
      let parag=document.getElementsByClassName("Paragraph")[0];
      btn.className="ButtonDev btn btn-danger"
      btn.innerHTML="Marcar como no retorno"
      parag.innerHTML="Presione si el usuario no retorno un libro:"
      this.form.controls["id_devolucion"].setValue(0)
    }else{
      let btn=document.getElementsByClassName("ButtonDev")[0];
      let parag=document.getElementsByClassName("Paragraph")[0];
      btn.className="ButtonDev btn btn-info"
      btn.innerHTML="Quitar marca de no retorno"
      parag.innerHTML="Presione si el usuario retorno o no tiene que ver con un libro"
      this.form.controls["id_devolucion"].setValue(1)
    }
    
    this.notReturned=!bool;
  }
  SetEndBanDate():void{
    let bool=this.EndBanDate;
    if(bool){
     
      let btn=document.getElementsByClassName("ButtonEndDate")[0];
      btn.className="ButtonEndDate btn btn-primary"
      btn.innerHTML="Establecer Fecha fin"
      
    }else{
     
      let btn=document.getElementsByClassName("ButtonEndDate")[0];
      btn.className="ButtonEndDate btn btn-secondary"
      btn.innerHTML="No establecer fecha"
      
      
      
    }
    this.EndBanDate=!bool;
  }
  SetEndDate(event:any){
      if(event.target.value==''){
        this.form.controls["fecha_fin_sancion"].setValue(null)
      }else{
        this.form.controls["fecha_fin_sancion"].setValue(event.target.value)
      }
   
      
  }
}
