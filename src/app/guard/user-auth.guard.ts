import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from "../service/User.service";

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private userService:UserService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.userService.getUser()==null){
        alert("You need to log in!");
        this.router.navigate([""]);
        return new Observable((observer)=>{
          observer.next(false);
          observer.complete();
        });
      }else{
        return new Observable((observer)=>{
          observer.next(true);
          observer.complete();
        });
      }
  }
}
