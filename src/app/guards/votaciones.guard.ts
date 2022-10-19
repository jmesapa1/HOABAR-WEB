import { VotacionesService } from './../services/votaciones/votaciones.service';
import { CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotacionesGuard implements CanActivateChild {

  constructor(private _router:Router,private votacionesService:VotacionesService){
    
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {   
      if ( localStorage.getItem("idUserHoa")) {
        return true;
      } else {
        this._router.navigate(["landing/lista"]);
        return  false;
      }
    } catch (e) {
      this._router.navigate(["landing/lista"]);
      return false;
    }
  }
  
}
