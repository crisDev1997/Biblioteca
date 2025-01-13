import { Component, OnInit, Output, ViewChild , EventEmitter} from '@angular/core';
import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User} from 'src/app/modules/User';
import { BookSection } from 'src/app/modules/Book';
import { Loan } from 'src/app/modules/Loan';
import { UserService } from 'src/app/services/user.service';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.css']
})
export class AddLoanComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Output() create: EventEmitter<any>=new EventEmitter();
  usersAllowed$!:Observable <User[]>;
  booksAvaible$!:Observable <BookSection[]>;
  form!: FormGroup;
  constructor(private userService:UserService, private router:Router, private bookService:BookService, private loanService:LoanService) { }

  ngOnInit(): void {
    this.usersAllowed$=this.userService.getAllowedUsers()
    this.booksAvaible$=this.bookService.getBookAvaibles()
    const fechaP=new Date(Date.now()).toISOString().split("T")[0];
    this.form=this.createFormGroup()
    this.form.controls['fecha_prestamo_persona'].setValue(fechaP)
    this.form.controls['fecha_prestamo_persona'].disable();
  }
  createFormGroup():FormGroup{
    return new FormGroup({
      id_usuario:new FormControl("",[Validators.required]),
      id_libro:new FormControl("",[Validators.required]),
      fecha_prestamo_persona:new FormControl("",[Validators.required]),
      fecha_vencimiento_entrega:new FormControl("",[Validators.required]),
    })
  }
  
  onSubmit(formData:Omit<Loan,"id">):void{
    this.loanService.addLoan(formData).subscribe(data=>{
      console.log(data)
      this.router.navigate(['loans/loans-list'])
    })
  }
  changeIdUser(event:any|null){
    this.form.controls['id_usuario'].setValue(event.target.value)
  }
  changeIdBook(event:any|null){
    this.form.controls['id_libro'].setValue(event.target.value)
  }
}
