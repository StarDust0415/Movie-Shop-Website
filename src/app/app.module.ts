import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import {AppComponent, produtList} from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {GetProductService} from './service/get-product.service';
import {Http, HttpModule} from '@angular/http';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './routerOutlet/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import { ProductDetailComponent } from './routerOutlet/product-detail/product-detail.component';
import { ShoppingCartComponent } from './routerOutlet/shopping-cart/shopping-cart.component';
import {ProductListComponent} from "./routerOutlet/product-list/product-list.component";
import {ProductDisplayComponent} from "./routerOutlet/product-display/product-display.component";
import {ShoppingCartService} from "./service/shopping-cart.service";
import { CheckoutComponent } from './routerOutlet/checkout/checkout.component';
import {UserService} from "./service/User.service";
import { FooterComponent } from './footer/footer.component';
import {UserAuthGuard} from "./guard/user-auth.guard";
import {OrderService} from "./service/order.service";
import {ResolveCartGuard} from "./guard/resolve-cart.guard";
import {ResolveProductsGuard} from "./guard/resolve-products.guard";
import {GetSalesmanService} from "./service/get-salesman.service";
import {NgSwitch} from "@angular/common";
import { ViewOrderComponent } from './routerOutlet/view-order/view-order.component';
import {SignUpComponent} from "./routerOutlet/sign-up/sign-up.component";
import {SpecificProductResolveGuardGuard} from "./guard/specific-product-resolve-guard.guard";
import {MoviesComponent} from './routerOutlet/movies/movies.component';

const appRoutes:Routes=[
  {path:'viewOrder',component:ViewOrderComponent,pathMatch: 'full',canActivate:[UserAuthGuard]},
  {path:'signup',component:SignUpComponent,pathMatch: 'full'},
  {path:'productdetail/:id',component:ProductDetailComponent,pathMatch: 'full'},
  {path:'productlist/:salesmanID/:type/:text/:page',component:ProductListComponent},
  {path:'shoppingcart',component:ShoppingCartComponent,pathMatch: 'full'},
  {path:'checkout/:id',component:CheckoutComponent,pathMatch: 'full',canActivate:[UserAuthGuard]},
  {path:'',component:HomeComponent,pathMatch: 'full'},
  {path:'movies',component:MoviesComponent,pathMatch:'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductDisplayComponent,
    ProductListComponent,
    NavigationComponent,
    HomeComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    FooterComponent,
    SignUpComponent,
    ViewOrderComponent,
    MoviesComponent
  ],
  imports: [
    NgbModule.forRoot(),
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService,ShoppingCartService, GetProductService,UserAuthGuard,OrderService,
    ResolveCartGuard,ResolveProductsGuard,GetSalesmanService,SpecificProductResolveGuardGuard],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})

export class AppModule { }
