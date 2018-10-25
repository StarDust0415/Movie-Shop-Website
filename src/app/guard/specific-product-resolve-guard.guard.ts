import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Product} from "../Model/ProductModel";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class SpecificProductResolveGuardGuard implements Resolve<Product> {
  constructor( private http:Http,private router: Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    let parameter: URLSearchParams = new URLSearchParams();
    parameter.set("_id",route.paramMap.get('id'));
    return this.http.get("/api/getProduct",{search:parameter}).map(result=>{
      return result.json();
    }).catch( (err) => Observable.throw(err.json().error) );;
  }
}
