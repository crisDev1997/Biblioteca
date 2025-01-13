import { Component, OnInit, Output, ViewChild , EventEmitter, Input} from '@angular/core';
import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { JournalModel } from 'src/app/modules/Journal';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-update-journal',
  templateUrl: './update-journal.component.html',
  styleUrls: ['./update-journal.component.css']
})
export class UpdateJournalComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Input() id!:any;

  @Input() ReloadData!:Function;

  @Output() create: EventEmitter<any>=new EventEmitter();
  form!: FormGroup;
  
  constructor(private journalService:JournalService, private router:Router, private accessId: ActivatedRoute) { }
  ngOnInit(): void {
    this.form=this.createFormGroup()
    this.journalService.getJournal(this.id).subscribe(data=>{
      let fec=new Date(data[0].fecha_publicacion).toISOString().split("T")[0];
      console.log(data)
      this.form.setValue({titulo:data[0].titulo,titular:data[0].titular,num_volumen:data[0].num_volumen,num_revista:data[0].num_revista,cantidad:data[0].cantidad,disponibles:data[0].cantidad_disponible,fecha_publicacion:fec,link_pdf_ref:data[0].link_pdf_ref})
    })
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      titulo:new FormControl("",[Validators.required]),
      titular:new FormControl("",[Validators.required]),
      num_volumen:new FormControl("",[Validators.required]),
      num_revista:new FormControl("",[Validators.required]),
      cantidad:new FormControl("",[Validators.required]),
      disponibles:new FormControl("",[Validators.required]),
      fecha_publicacion:new FormControl("",[Validators.required]),
      link_pdf_ref:new FormControl("",[Validators.required]),
    })
  }
  onSubmit(formData:Omit<JournalModel,"id">):void{
    this.journalService.updateJournal(this.id,formData).subscribe(data=>{
      console.log(data)
    })
    document.getElementById('btn-close')?.click()
    this.ReloadData();
  }

}
