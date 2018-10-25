import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {GetProductService} from "../service/get-product.service";

@Injectable()
export class ResolveProductsGuard implements Resolve<any> {
  constructor(private produceService: GetProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): Promise<any> {
    return this.produceService.getProductList().then(result => {
      if (result) return result;
    });
  }
}
