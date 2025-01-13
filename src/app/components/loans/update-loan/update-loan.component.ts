import { Component, OnInit, Output, ViewChild , EventEmitter, Input} from '@angular/core';
import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User} from 'src/app/modules/User';
import { Journal} from 'src/app/modules/Journal';
import { Loan } from 'src/app/modules/Loan';
import { UserService } from 'src/app/services/user.service';
import { JournalService } from 'src/app/services/journal.service';
import { LoanService } from 'src/app/services/loan.service';
import { BookSection } from 'src/app/modules/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-update-loan',
  templateUrl: './update-loan.component.html',
  styleUrls: ['./update-loan.component.css']
})
export class UpdateLoanComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Input() id!:Number;
  @Input() ReloadData!:Function;
  @Output() create: EventEmitter<any>=new EventEmitter();

  usersAllowed$!:Observable <User[]>;
  journalsAvaible$!:Observable <Journal[]>;
  booksAvaible$!:Observable <BookSection[]>;
  form!: FormGroup;
  idUserSelected!:Number;
  valueUserSelected!:String;
  idBookSelected!:Number;
  valueBookSelected!:String;
  constructor(private userService:UserService, private router:Router, private bookService:BookService, private loanService:LoanService,private journalService:JournalService, private accessId:ActivatedRoute) { }

  ngOnInit(): void {
    this.usersAllowed$=this.userService.getAllowedUsers()
    this.booksAvaible$=this.bookService.getBookAvaibles()
    this.journalsAvaible$=this.journalService.getJournalsAvaible()
    const fechaP=new Date(Date.now()).toISOString().split("T")[0];
    this.form=this.createFormGroup()
    this.loanService.getLoan(this.id).subscribe(data=>{
      const fechP=new Date(data[0].fecha_prestamo_persona).toISOString().split("T")[0];
      const fechE=new Date(data[0].fecha_vencimiento_entrega).toISOString().split("T")[0];
      this.form.setValue({id_usuario:data[0].id_usuario,id_libro:data[0].id_libro,fecha_prestamo_persona:fechP,fecha_vencimiento_entrega:fechE,status_devolucion:data[0].status_devolucion})
      this.idUserSelected=data[0].id_usuario;
      this.valueUserSelected=String(data[0].nombres+" "+data[0].apellidos)
      this.idBookSelected=data[0].id_libro;
      this.valueBookSelected=data[0].titulo;
    })
    
    
    
    //this.form.controls['fecha_prestamo_persona'].setValue(fechaP)
    //this.form.controls['fecha_prestamo_persona'].disable();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      id_usuario:new FormControl("",[Validators.required]),
      id_libro:new FormControl("",[Validators.required]),
      fecha_prestamo_persona:new FormControl("",[Validators.required]),
      fecha_vencimiento_entrega:new FormControl("",[Validators.required]),
      status_devolucion:new FormControl("",[Validators.required]),
    })
  }
  onSubmit(formData:Omit<Loan,"id">):void{
    this.loanService.updateLoan(this.id,formData).subscribe(data=>{
      console.log(data)
      
    })
    document.getElementById('btn-close')?.click()
    this.ReloadData();
  }
  changeIdUser(event:any|null){
    this.form.controls['id_usuario'].setValue(event.target.value)
  }
  changeIdBook(event:any|null){
    this.form.controls['id_libro'].setValue(event.target.value)
  }
}

