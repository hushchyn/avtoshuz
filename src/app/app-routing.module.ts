import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { TyresComponent } from './admin/admin-products/tyres/tyres.component';
import { WheelsComponent } from './admin/admin-products/wheels/wheels.component';
import { MotoComponent } from './admin/admin-products/moto/moto.component';
import { TrackComponent } from './admin/admin-products/track/track.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BasketComponent } from './pages/basket/basket.component';
import { OrderComponent } from './pages/order/order/order.component';
import { ProfileGuard } from './shared/guards/profile.guard';



const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'dostavka-optlata', component: DeliveryPaymentComponent},
  {path:'contacts', component: ContactsComponent},
  {path:'about-us', component: AboutUsComponent},
  {path:'basket', component: BasketComponent},
  {path:'order', component: OrderComponent},
  {path:'profile', component: ProfileComponent,canActivate: [ ProfileGuard]},
  {path:'admin', component: AdminComponent,  children:[
    {path: '', pathMatch: 'full', redirectTo: 'admin-category'},
    {path: 'admin-category', component: AdminCategoryComponent},
    {path: 'admin-products', component: AdminProductsComponent, children:[
      {path: '', pathMatch: 'full', redirectTo: 'tyres'},
      {path: 'tyres', component: TyresComponent},
      {path: 'wheels', component: WheelsComponent},
      {path: 'moto', component: MotoComponent},
      {path: 'track', component: TrackComponent}
    ]},
    {path: 'admin-orders', component: AdminOrdersComponent},
    {path: 'admin-news', component: AdminNewsComponent},
  ]},
  {path:'news', component: NewsComponent},
  {path:'news/:id', component: NewsDetailsComponent},
  {path:':category', component: ProductsComponent},
  {path:':category/:id', component: ProductsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
