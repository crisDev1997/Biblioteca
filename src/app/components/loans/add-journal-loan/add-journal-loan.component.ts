import { Component, OnInit, Output, ViewChild , EventEmitter} from '@angular/core';
import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User} from 'src/app/modules/User';
import { Journal, JournalModel } from 'src/app/modules/Journal';
import { Loan } from 'src/app/modules/Loan';
import { UserService } from 'src/app/services/user.service';
import { JournalService } from 'src/app/services/journal.service';
import { LoanService } from 'src/app/services/loan.service';


@Component({
  selector: 'app-add-journal-loan',
  templateUrl: './add-journal-loan.component.html',
  styleUrls: ['./add-journal-loan.component.css']
})
export class AddJournalLoanComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Output() create: EventEmitter<any>=new EventEmitter();
  usersAllowed$!:Observable <User[]>;
  journalsAvaible$!:Observable <Journal[]>;
  form!: FormGroup;

  constructor(private userService:UserService, private router:Router, private journalService:JournalService, private loanService:LoanService) { }

  ngOnInit(): void {
    this.usersAllowed$=this.userService.getAllowedUsers()
    this.journalsAvaible$=this.journalService.getJournalsAvaible()
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
