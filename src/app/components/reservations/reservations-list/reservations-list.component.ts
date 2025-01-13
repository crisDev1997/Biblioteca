import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Reservation } from 'src/app/modules/Reservation';
import { LoanService } from 'src/app/services/loan.service';
import { ReservationService } from 'src/app/services/reservation.service';
@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {
  reservations$!:Observable<Reservation[]>
  name_user!:String; 
  name_book!:String; 
  id_reserv!:Number;
  
  formLoan!:FormGroup;
  constructor(private reservService:ReservationService,private modalService: NgbModal,private loanService: LoanService) { }

  ngOnInit(): void {
    this.reservations$=this.reservService.getAllReservations();
    this.formLoan=this.createFormGroup()
    this.formLoan.controls["fecha_prestamo_persona"].disable()
    this.id_reserv=0
  }
  createFormGroup():FormGroup{
    return new FormGroup({
      id_usuario:new FormControl("",[Validators.required]),
      id_libro:new FormControl("",[Validators.required]),
      fecha_prestamo_persona:new FormControl("",[Validators.required]),
      fecha_vencimiento_entrega:new FormControl("",[Validators.required]),
    })
  }
  prestar(nameUser:String,nameBook:String,id_user:Number,id_book:Number,idReser:Number,loanForm:any){
    this.name_user=nameUser;
    this.name_book=nameBook;
    let fecha_actual=new Date(Date.now()).toISOString().split("T")[0];
    this.formLoan.setValue({id_usuario:id_user,id_libro:id_book,fecha_prestamo_persona:fecha_actual,fecha_vencimiento_entrega:""})
    this.modalService.open(loanForm, {size: 'lg'})
    this.id_reserv=idReser;

  }
  delete(idReser:Number){
    let Confirm=confirm("Desea eliminar esta reservacion ?");
    if(Confirm){
      this.reservService.deleteReservation(idReser).subscribe(data=>console.log(data))
      this.reservations$=this.reservService.getAllReservations();
    }
  }
  canDelete(fecha_limite:Date):Boolean{
    const fecha_actual=new Date(Date.now()).getTime()
    const fecha=new Date(fecha_limite).getTime()
    if(fecha_actual>fecha){
      return true
    }else{
      return false
    }
  }
  onSubmitLoan():void{
    this.formLoan.controls["fecha_prestamo_persona"].enable()
    this.loanService.addLoan(this.formLoan.value).subscribe(data=>{
      console.log(data)
      this.reservService.deleteReservation(this.id_reserv).subscribe(data=>{
        console.log(data)
        this.reservations$=this.reservService.getAllReservations();
        document.getElementById('btnClose1')?.click()
      })

    })
  }

}
