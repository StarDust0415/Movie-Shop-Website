import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService} from "../service/shopping-cart.service";
import {Http} from "@angular/http";
import {OrderProduct} from "../Model/CustomerModel";

@Injectable()
export class ResolveCartGuard implements Resolve<[OrderProduct]> {
  constructor(private http:Http,private shoppingCart:ShoppingCartService){}
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Promise<[OrderProduct]>{
    return this.shoppingCart.getAllCart().then(result=>{
      console.log(result);
      if (result) return result;
    })
  }
}
