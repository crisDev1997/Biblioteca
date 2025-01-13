import { Component, EventEmitter, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { SectionService } from 'src/app/services/section.service';
import { Section } from 'src/app/modules/Section';

import { BookModel } from 'src/app/modules/Book';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Output() create: EventEmitter<any>=new EventEmitter();
  form!: FormGroup;
  sections$!:Observable<Section[]>
  constructor(private bookService:BookService, private router:Router, private sectionService:SectionService) { }
  checkOrd!:boolean;
  
  ngOnInit(): void {
    this.form=this.createFormGroup();
    this.checkOrd=false;
    this.sections$=this.sectionService.getAll()
  }
  createFormGroup():FormGroup{
    return new FormGroup({
      titulo:new FormControl('',[Validators.required,Validators.minLength(4)]),
      autor:new FormControl('',[Validators.required,Validators.minLength(4)]),
      genero:new FormControl('',[Validators.required,Validators.minLength(4)]),
      id_seccion:new FormControl(null),
      cantidad:new FormControl("",[Validators.required,Validators.minLength(1)]),
      link_pdf_ref:new FormControl("",[Validators.required,Validators.minLength(10)]),
    })
  }

  
  changeIdSection(event:any|null):void{
    this.form.controls['id_seccion'].setValue(event.target.value)

  }

  changeNull():void{
    this.checkOrd=false
    this.form.controls['id_seccion'].setValue(null)
   
  }
  onSubmit(formData:Omit<BookModel,"id">):void{
   
    this.bookService.addBook(formData).pipe(first()).subscribe((data)=>{
      
      this.create.emit(null);
      this.router.navigate(['books/books-list'])
    })
 
  }
}
