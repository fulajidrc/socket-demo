import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authStore } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store:Store, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLogin = this.getValue(this.store.select(authStore.IS_LOGIN))
      if(!isLogin){
          this.router.navigate(['/login']);
      }
      return isLogin ? true : false;
  }

  getValue(obj: Observable<boolean>){
    let value: boolean = false;
    obj.subscribe((v:boolean) => value = v);
    return value;
  }

  
}
