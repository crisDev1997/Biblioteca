import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { SectionService } from 'src/app/services/section.service';
import { Section } from 'src/app/modules/Section';
import { BookModel } from 'src/app/modules/Book';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Output() create: EventEmitter<any>=new EventEmitter();
  form!: FormGroup;
  id!:Number;
  sections$!:Observable<Section[]>
  book$!:Observable<BookModel[]>
  checkOrd!:boolean;
  selectId!:any;
  selectedNameSection!:any;
  constructor(private bookService:BookService, private router:Router, private sectionService:SectionService,private accessId:ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedNameSection=false;
    this.id=Number(this.accessId.snapshot.paramMap.get('id'));
    this.book$=this.bookService.getBook(this.id)
    this.form=this.createFormGroup();
    this.sections$=this.sectionService.getAll()
    this.bookService.getBook(this.id).subscribe(data=>{
      if(data[0].id_seccion==null){
        this.checkOrd=false
      }else{
        this.checkOrd=true
        this.selectId=data[0].id_seccion
        this.sectionService.getSection(this.selectId).subscribe(data=>{
          if(data[0]){
            this.selectedNameSection=data[0].nombre_seccion
          }else{
            this.selectedNameSection=false
          }
        })
        
      }
      this.form.setValue({titulo:data[0].titulo,autor:data[0].autor,genero:data[0].genero,id_seccion:data[0].id_seccion,cantidad:data[0].cantidad,disponibles:data[0].disponibles,link_pdf_ref:data[0].link_pdf_ref})
    })
    
  }
  createFormGroup():FormGroup{
    return new FormGroup({
      titulo:new FormControl('',[Validators.required,Validators.minLength(4)]),
      autor:new FormControl('',[Validators.required,Validators.minLength(4)]),
      genero:new FormControl('',[Validators.required,Validators.minLength(4)]),
      id_seccion:new FormControl(null),
      cantidad:new FormControl("",[Validators.required,Validators.minLength(1)]),
      disponibles:new FormControl("",[Validators.required,Validators.minLength(1)]),
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
    this.bookService.updateBook(this.id,formData).pipe(first()).subscribe((data)=>{

      this.create.emit(null);
      this.router.navigate([`books/view-book/${this.id}`])
    })
  }
  cancelModify():void{
    this.router.navigate([`books/view-book/${this.id}`])
  }
}
