import { Component, OnInit, Output, ViewChild , EventEmitter, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Journal } from 'src/app/modules/Journal';
import { JournalService } from 'src/app/services/journal.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-edit-journal',
  templateUrl: './edit-journal.component.html',
  styleUrls: ['./edit-journal.component.css']
})
export class EditJournalComponent implements OnInit {

  @Input() ReloadData!:Function;
  id!:Number;
  journal$!:Observable<Journal[]>
  constructor(private journalService:JournalService,private router:Router, private accessId:ActivatedRoute) { }

  ngOnInit(): void {
    let id=Number(this.accessId.snapshot.paramMap.get('id'));
    this.id=id
    this.journal$=this.journalService.getJournal(this.id)
    this.ReloadData=this.reloadData.bind(this);
  }
  deleteJournal(id:Number){
    this.journalService.deleteJournal(id).subscribe(data=>{
      console.log(data)
      this.router.navigate(['journals/journals-list'])
    })
  }
  reloadData():void{
    this.journal$=this.journalService.getJournal(this.id)
  }
}
