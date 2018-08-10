import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuardGuard implements CanActivate {
	constructor(private authService: AuthService){};


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
    console.log("user is authorized"); 
      return true;
    } else {
      //window.alert("You don't have permission to view this page"); 
      return false;
    }
  }
}
