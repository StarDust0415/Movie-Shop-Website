import { Component } from '@angular/core';

export class Rate{
  rateNumber: number;
  description: string;
}

export const produtList: any[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isSuccess= false;
  login(user: any) {
    this.isSuccess = (user != null);
  }
}
// export class Product {
//   constructor(public name: string,
//               public productDescription: string,
//               public stock: number,
//               public imgUrl: string) {}
//  getRate(): number {
//   if (this.rateList === null) {
//     return 0;
//   }
//   let sum = 0;
//   for (const i in this.rateList) {
//     sum += this.rateList[i].rateNumber;
//   }
//   return (sum / this.rateList.length);
// }
// }
// export class User {
//   constructor(public userName:string,public password:string){}
// }
// export class Consumer extends User{
//   profile: Profile;
// }
// export class Saler extends User{
//   productList: Product[];
// }
// export class Profile{
//   name: string;
//   birthYear: number;
// }


