import { Component, OnInit, Output, ViewChild , EventEmitter, Input} from '@angular/core';
import {FormControl,FormGroup,NgForm,Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { JournalModel } from 'src/app/modules/Journal';
import { JournalService } from 'src/app/services/journal.service';


@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css']
})
export class AddJournalComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Input() ReloadList!:Function;
  @Output() create: EventEmitter<any>=new EventEmitter();
  form!: FormGroup;
  constructor(private journalService:JournalService, private router:Router, private accessId: ActivatedRoute) { }
  ngOnInit(): void {
    this.form=this.createFormGroup()
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      titulo:new FormControl("",[Validators.required]),
      titular:new FormControl("",[Validators.required]),
      num_volumen:new FormControl("",[Validators.required]),
      num_revista:new FormControl("",[Validators.required]),
      cantidad:new FormControl("",[Validators.required]),
      fecha_publicacion:new FormControl("",[Validators.required]),
      link_pdf_ref:new FormControl("",[Validators.required]),
    })
  }
  onSubmit(formData:Omit<JournalModel,"id">):void{
    this.journalService.addJournal(formData).subscribe(data=>{
      console.log(data)
    })

    document.getElementById('btn-close')?.click()
    this.form.setValue({titulo:'',titular:'',num_volumen:'',num_revista:'',cantidad:'',fecha_publicacion:'',link_pdf_ref:''})
    this.ReloadList();
  }
  
}
