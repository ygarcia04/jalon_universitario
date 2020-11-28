import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authservice:AuthService,
    private router:Router
  ){}

  canActivate():boolean{
    if (this.authservice.loggedIn()) {
      return true;
    }
    if (this.authservice.loggedInAdmin()) {
      return true;
    } 
    this.router.navigate(['/signin']);
    return false;
  }
 
  }

  

