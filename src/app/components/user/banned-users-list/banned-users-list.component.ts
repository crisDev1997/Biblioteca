import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { SanctionUser } from 'src/app/modules/Sanction';
import { SanctionService } from 'src/app/services/sanction.service';

@Component({
  selector: 'app-banned-users-list',
  templateUrl: './banned-users-list.component.html',
  styleUrls: ['./banned-users-list.component.css']
})
export class BannedUsersListComponent implements OnInit {
  filterusers='';
  check!:string;
  usersAll$!:Observable <SanctionUser[]>;
  usersReturn$!:Observable <SanctionUser[]>;
  usersNotReturn$!:Observable <SanctionUser []>;

  constructor(private banService:SanctionService,private router:Router) { }

  ngOnInit(): void {
    this.check="all";
    this.usersAll$=this.getAllBanned();
    this.usersReturn$=this.getAllBannedReturn();
    this.usersNotReturn$=this.getAllBannedNotReturn();
  }
  getAllBanned():Observable<SanctionUser[]>{
    return this.banService.getAll()
  }
  getAllBannedReturn():Observable<SanctionUser[]>{
    return this.banService.getAllReturn()
  }
  getAllBannedNotReturn():Observable<SanctionUser[]>{
    return this.banService.getAllNotReturn()
  }
  navigateViewBanned(ci:string){
    this.router.navigate([`users/view-ban/${ci}`])
  }
  Filter(filter:string){
    this.check=filter
  }

}
