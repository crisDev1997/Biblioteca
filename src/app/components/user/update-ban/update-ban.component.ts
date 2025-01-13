import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { SanctionUser,Sanction } from 'src/app/modules/Sanction';
import { SanctionService } from 'src/app/services/sanction.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-ban',
  templateUrl: './update-ban.component.html',
  styleUrls: ['./update-ban.component.css']
})

export class UpdateBanComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Output() create: EventEmitter<any>=new EventEmitter();
  form!: FormGroup;
  ci!:string;
  id!:number;
  userBanned$!:Observable<SanctionUser[]>;
  idDevolucion!:number;
  notReturned!:boolean;
  EndBanDate!:boolean;
  constructor(private sanctionService:SanctionService,private router:Router, private accessId:ActivatedRoute) { }

  ngOnInit(): void {
    let id=Number(this.accessId.snapshot.paramMap.get('id'));
    this.userBanned$=this.sanctionService.getSancionById(id);
    this.form=this.createFormGroup();
    this.userBanned$.subscribe(data=>{
      const fecha_sancion=new Date(data[0].fecha_sancion).toISOString().split("T")[0];
      const fecha_fin_sancion=new Date(data[0].fecha_fin_sancion).toISOString().split("T")[0];
      if(data[0].id_devolucion>0){
        this.notReturned=true
      }else{
        this.notReturned=false
      }
      this.ci=data[0].ci;
      this.idDevolucion=data[0].id_devolucion;
      this.form.setValue({id_usuario:data[0].id_usuario, id_devolucion:data[0].id_devolucion,razon_sancion:data[0].razon_sancion,fecha_sancion:fecha_sancion,fecha_fin_sancion:fecha_fin_sancion})
    })
    this.id=id
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
    this.sanctionService.updateSanction(this.id,formData).subscribe(data=>{
      console.log(data)
      this.router.navigate([`users/view-ban/${this.ci}`])
    }) 
}
    ChangeReturn():void{
      let bool=this.notReturned;
      if(bool){
       this.form.controls["id_devolucion"].setValue(0)
      }else{
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
      console.log(this.form.controls["fecha_fin_sancion"].value)
      
  }
  resetForm():void{
    this.userBanned$.subscribe(data=>{
      const fecha_sancion=new Date(data[0].fecha_sancion).toISOString().split("T")[0];
      const fecha_fin_sancion=new Date(data[0].fecha_fin_sancion).toISOString().split("T")[0];
      if(data[0].id_devolucion>0){
        this.notReturned=true
      }else{
        this.notReturned=false
      }
      this.idDevolucion=data[0].id_devolucion;
      this.form.setValue({id_usuario:data[0].id_usuario, id_devolucion:data[0].id_devolucion,razon_sancion:data[0].razon_sancion,fecha_sancion:fecha_sancion,fecha_fin_sancion:fecha_fin_sancion})
    })
  }
  deleteBan(id:number):void{
    var CONFIRM=confirm("Esta seguro de quitar la sancion?");
    if(CONFIRM==true){
      this.sanctionService.deleteSanction(id).pipe(first()).subscribe(data=>{
        console.log(data)
      })
      this.router.navigate([`users/users-list`])
    } 
  }
  navigateViewBan(ci:string):void{
    this.router.navigate([`users/view-ban/${ci}`])
  }
}
