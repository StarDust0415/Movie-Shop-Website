import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {OrderProduct} from "../Model/CustomerModel";
@Injectable()
export class OrderService {
  constructor(private http: Http) {
  }

  orderGenerate(order: OrderProduct[], userid: any) {
    let newOrder = {orderProduct: order, status: "pending", id: userid};
    return this.http.post('/api/orderlist', newOrder)
      .map((res) => {
        return res.json();
      }).toPromise();
    }
  cancel(_id:any,userId:any){
    let ID={_id:_id,userID:userId};
    return this.http.post('/api/order2', ID)
      .map((result) => {
        return result.json()
      }).toPromise();
  }
  confirm(_id:any,userId:any){
    let ID={_id:_id,userID:userId};
    return this.http.post('/api/order1', ID)
      .map((result) => {
        return result.json()
    }).toPromise();
  }
}
