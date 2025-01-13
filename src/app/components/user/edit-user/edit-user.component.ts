import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


import { Admin } from 'src/app/modules/Admin';
import {  UserData } from 'src/app/modules/User';

import { UserService } from 'src/app/services/user.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  ci!:String;
  user$!:Observable<UserData[]>;
  adminId!:Pick<Admin,'id_admin'>;
  constructor(private userService:UserService, private router:Router, private accessId:ActivatedRoute) {
   }

  ngOnInit(): void {
    let ci=String(this.accessId.snapshot.paramMap.get('ci'));
    this.user$=this.userService.getUser(ci);
    this.ci=ci
  }
  navigateUpdateUser(ci:string):void{
    this.router.navigate([`users/update-user/${ci}`])
    
  }
  deleteUser(ci:string):void{
    var CONFIRM=confirm("Esta seguro de eliminar a este usuario?");
    if(CONFIRM==true){
      this.userService.deleteUser(ci).pipe(first()).subscribe(data=>{
        console.log(data)
      })
      this.router.navigate(['users/users-list'])
    
    }
    
  }
  banUser(ci:string):void{
    this.router.navigate([`users/add-user-ban/${ci}`])
  }

}
