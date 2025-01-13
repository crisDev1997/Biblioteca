import { Component, OnInit, Output, ViewChild , EventEmitter, Input} from '@angular/core';
import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { BookSection } from 'src/app/modules/Book';

import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderModel } from 'src/app/modules/Order';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit{
  @ViewChild("formDirective") formDirective!:NgForm;
  @Output() create: EventEmitter<any>=new EventEmitter();
  @Input() id_admin!:Number;
  form!: FormGroup;
  books$!:Observable <BookSection[]>;
  @Input() ReloadList!:Function;
  @Input() reset!:boolean;
  constructor(private orderService:OrderService, private router:Router, private bookService:BookService) { }

ngOnInit(): void {
    this.books$=this.bookService.getAllBooks()
    this.form=this.createFormGroup()
    const fechaP=new Date(Date.now()).toISOString().split("T")[0];
    this.form.controls['fecha_pedido'].setValue(fechaP);
    this.form.controls['id_admin'].setValue(this.id_admin)
  }
  createFormGroup():FormGroup{
    return new FormGroup({
      id_admin:new FormControl("",[Validators.required]),
      id_libro:new FormControl("",[Validators.required]),
      cantidad_pedida:new FormControl("",[Validators.required]),
      fecha_pedido:new FormControl("",[Validators.required]),
    })
  }
  
  onSubmit(formData:Omit<OrderModel,"id">):void{
    this.orderService.addOrder(formData).subscribe(data=>{
      console.log(data)
    })
    document.getElementById('btn-close')?.click()
    const fechaP=new Date(Date.now()).toISOString().split("T")[0];

    this.form.setValue({id_admin:this.id_admin,id_libro:'',cantidad_pedida:'',fecha_pedido:fechaP})
    this.ReloadList()

    
  }
  changeIdBook(event:any|null){
    this.form.controls['id_libro'].setValue(event.target.value)
  }
}
