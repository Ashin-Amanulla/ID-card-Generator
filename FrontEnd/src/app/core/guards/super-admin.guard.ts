import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
 isSuper!: boolean;

  constructor(private _auth: AuthService, private _router: Router){}

  canActivate(){

    if (this._auth.isSuper()) return true;
    this._router.navigate(['']);
    return false;

  }
  
}
