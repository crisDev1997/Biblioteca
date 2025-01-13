import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { SanctionUser } from 'src/app/modules/Sanction';
import { SanctionService } from 'src/app/services/sanction.service';

import { first } from 'rxjs/operators';
@Component({
  selector: 'app-edit-ban',
  templateUrl: './edit-ban.component.html',
  styleUrls: ['./edit-ban.component.css']
})
export class EditBanComponent implements OnInit {
  ci!:String;
  userBanned$!:Observable<SanctionUser[]>;

  constructor(private sanctionService:SanctionService,private router:Router, private accessId:ActivatedRoute) { }

  ngOnInit(): void {
    let ci=String(this.accessId.snapshot.paramMap.get('ci'));

    this.userBanned$=this.sanctionService.getSanction(ci);
    
    this.ci=ci
  }
  navigateUpdateBan(id:number):void{
    this.router.navigate([`users/update-ban/${id}`])
    
  }
  deleteBan(id:number):void{
    var CONFIRM=confirm("Esta seguro de quitar la sancion?");
    if(CONFIRM==true){
      this.sanctionService.deleteSanction(id).pipe(first()).subscribe(data=>{
        console.log(data)
      })
      this.router.navigate(['users/users-list'])
    
    }
    
  }

}
