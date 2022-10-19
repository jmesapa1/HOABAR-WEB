
import { Injectable } from "@angular/core";
import { tap, finalize } from "rxjs/operators";

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class ClienteGuard implements CanActivate  {
  constructor(private _router: Router, private auth: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem("idUserHoa") === null || localStorage.getItem("idUserHoa") === undefined) {
     // window.alert('No tienes permisos para ingresar, inicia sesión')
      this._router.navigate(['login'])
    }
    return true;
  }

  
}
