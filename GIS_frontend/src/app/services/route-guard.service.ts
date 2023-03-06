import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
routevar=false;
  constructor( public router: Router) { }
  public isAuthenticated(): boolean {
    // const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);
    if (this.routevar===true) {
      return true
    } else {
      return false
    }
  }
  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  } 
}
