import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/modules/Admin';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  isAuthenticated=false;
  adminId!:Pick<Admin,'id_admin'>;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.isAdminLoggedIn$.subscribe((isLoggin)=>{
      this.isAuthenticated=isLoggin;
    });
  }

  NavUserList():void{
    this.router.navigate(["users/users-list"]);
  }
  NavAddUser():void{
    this.router.navigate(["users/add-user"])
  }

  logout():void{
    localStorage.removeItem('token');
    this.authService.isAdminLoggedIn$.next(false);
    this.router.navigate(["sign-in"]);
  }
  NavBanList():void{
    this.router.navigate(["users/banned-users-list"]);
  }
  Navigate(route:string){
    if(route=='/admins/view-account'){
      let id_admin=Number(localStorage.getItem('id_admin'))
      this.router.navigate([`${route}/${id_admin}`])
    }else{
      this.router.navigate([`${route}`])
    }
    
  }

}
