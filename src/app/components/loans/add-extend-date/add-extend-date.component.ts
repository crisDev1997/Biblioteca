import { Component, OnInit, Output, ViewChild , EventEmitter, Input} from '@angular/core';
import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

import { Extend } from 'src/app/modules/Extend';
import {  first } from 'rxjs/operators';
import { ExtendService } from 'src/app/services/extend.service';

@Component({
  selector: 'app-add-extend-date',
  templateUrl: './add-extend-date.component.html',
  styleUrls: ['./add-extend-date.component.css']
})
export class AddExtendDateComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;

  @Output() create: EventEmitter<any>=new EventEmitter();
  @Input() changeShowOperation!:Function;
  @Input() fecha_entrega!:Date;
  fecha_actual!:Date;
  @Input() id_devolucion!:Number;
  @Input() amplied!:boolean;
  form!: FormGroup;
  isOpen=false;
  constructor(private extendService:ExtendService, private router:Router, private accessId:ActivatedRoute) { }

  ngOnInit(): void {
    let fechaA=new Date(Date.now()).toISOString().split('T')[0];
    this.form=this.createFormGroup();
    const fechaE=new Date(this.fecha_entrega).toISOString().split("T")[0];
    this.form.setValue({id_devolucion:this.id_devolucion,fecha_entrega_anterior:fechaE,fecha_ampliacion:fechaA,fecha_limite_ampliacion:''})
  }


  createFormGroup():FormGroup{
    return new FormGroup({
      id_devolucion:new FormControl('',[Validators.required]),
      fecha_entrega_anterior:new FormControl('',[Validators.required]),
      fecha_ampliacion:new FormControl('',[Validators.required]),
      fecha_limite_ampliacion:new FormControl("",[Validators.required]),
    })
  }
  cancelExtendDate():void{
    this.changeShowOperation();
  }
  onSubmit(formData:Omit<Extend,"id">):void{
    let id=Number(this.accessId.snapshot.paramMap.get('id'));
    this.extendService.extendDate(formData).pipe(first()).subscribe((data)=>{
    console.log(data)
    this.create.emit(null);
    this.amplied=false;
    this.changeShowOperation()
    })
  }
}
