import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class GetSalesmanService {

  constructor(private http:Http) { }
  getSalesman(){
    return this.http.get("/api/salesman").map((result)=>{
      return result.json();}).toPromise();
  }
}
