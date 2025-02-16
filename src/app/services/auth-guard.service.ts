import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService:AuthService, private router:Router) { }
  canActivate():Observable<boolean>{
    if(!this.authService.isAdminLoggedIn$.value){
      this.router.navigate(["sign-in"])
    }
    return this.authService.isAdminLoggedIn$;
  }
}
