import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


import { Journal } from 'src/app/modules/Journal';
import { JournalService } from 'src/app/services/journal.service';
@Component({
  selector: 'app-journals-list',
  templateUrl: './journals-list.component.html',
  styleUrls: ['./journals-list.component.css']
})
export class JournalsListComponent implements OnInit {
  public ReloadList!:Function;
  faCaretDown=faCaretDown;
  filterbooks='';
  check!:String;
  journalsAll$!:Observable <Journal[]>;
  journalsAvaible$!:Observable <Journal[]>;
  journalsNotAvaible$!:Observable <Journal[]>;
  updateOn!:boolean;

  constructor(private journalService:JournalService,private router:Router) { }
  ngOnInit(): void {
    this.check='all'
    this.updateOn=false;
    this.journalsAll$=this.journalService.getAll()
    this.journalsAvaible$=this.journalService.getJournalsAvaible()
    this.journalsNotAvaible$=this.journalService.getJournalsNotAvaible()
    this.ReloadList=this.reloadList.bind(this)
  }
  Filter(filter:string){
    this.check=filter
  }
  navigateViewJournal(id:Number){
    this.router.navigate([`journals/view-journal/${id}`])
  }
  navigateViewPdf(link:String){
    let url_ref=link.valueOf()
    window.open(url_ref,'_blank')
  }
  reloadList():void{
    this.journalsAll$=this.journalService.getAll()
    this.journalsAvaible$=this.journalService.getJournalsAvaible()
    this.journalsNotAvaible$=this.journalService.getJournalsNotAvaible()
 
  }
 
}
