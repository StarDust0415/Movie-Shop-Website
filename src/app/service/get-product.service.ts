import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class GetProductService {
  salesmanID= "all";
  type= "all";
  private page= 0;
  private text= "all";
  constructor(private http: Http) { }
  postComment(rate, content, name, _id) {
    return this.http.post( "/api/comment", {rate: rate, content: content, name: name, _id: _id})
      // .subscribe()
      .map(
      (res)=>{
        return res.json();
      })
      .toPromise();
  }
  setSalesmanID(salesmantID) {
    this.salesmanID= salesmantID;
  }
  setType(type) {
    this.type=type;
  }
  setPage(page) {
    this.page = page;
   
  }
  setText(text){
    this.text=text;
  }
  getType(){
    return this.type;
  }
  getPage(){
    return this.page;
  }
  getText(){
    return this.text;
  }
  getSalesmanID(){
    return this.salesmanID;
  }
  //we need two way to get since sometimes we don't want to use the used conditions and sometimes we want
  getProductList(salesmanID?,type?,page?,text?):Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    if (salesmanID)
      params.set('salesmanId', salesmanID);
    else
      params.set('salesmanId', this.salesmanID);
    if (type)
      params.set("type",type);
    else
      params.set('type', this.type);
    if (page)
      params.set("page",page);
    else
      params.set('page', ""+this.page);
    if (text)
      params.set("text",text);
    else
      params.set('text', this.text);
    return this.http.get('/api/productlist',{search:params}).map(function(res){
      return res.json();
    }).toPromise();
  }
}
