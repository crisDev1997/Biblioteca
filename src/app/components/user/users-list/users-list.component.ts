import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Admin } from 'src/app/modules/Admin';
import { User,BannedUser } from 'src/app/modules/User';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  
})
export class UsersListComponent implements OnInit {
  filterusers='';
  check!:string;
  users$!:Observable <User[]>;
  usersAllowed$!:Observable <User[]>;
  usersBanned$!:Observable <BannedUser []>;
  adminId!:Pick<Admin,'id_admin'>;
  constructor(private userService:UserService,private authService:AuthService,private router:Router) {
    
   }

  ngOnInit(): void {
    this.check="all";
    this.users$=this.getAll();
    this.usersAllowed$=this.getAllAllowed();
    this.usersBanned$=this.getAllBanned();
    this.adminId=this.authService.adminId;
  } 
  getAll():Observable<User[]>{
    
    return this.userService.getAll()
  }
  getAllAllowed():Observable<User[]>{
    return this.userService.getAllowedUsers()
  }
  getAllBanned():Observable<BannedUser[]>{
    return this.userService.getBannedUsers()
  }


  navigateViewUser(userCi:string){
    
    return this.router.navigate([`users/view-user/${userCi}`])
  }
  navigateViewSanction(userCi:string){
    return this.router.navigate([`users/view-ban/${userCi}`])
  }
  Filter(filter:string){
    this.check=filter
  }
}
