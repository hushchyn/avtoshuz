import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterComponent } from './components/filter/filter.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
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


import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { TyresComponent } from './admin/admin-products/tyres/tyres.component';
import { WheelsComponent } from './admin/admin-products/wheels/wheels.component';
import { MotoComponent } from './admin/admin-products/moto/moto.component';
import { TrackComponent } from './admin/admin-products/track/track.component';
import { SearchPipe } from './shared/pipes/search/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminNewsComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactsComponent,
    DeliveryPaymentComponent,
    HomeComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    NewsComponent,
    NewsDetailsComponent,
    FilterComponent,
    ProfileComponent,
    BasketComponent,
    TyresComponent,
    WheelsComponent,
    MotoComponent,
    TrackComponent,
    SearchPipe,
    OrderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
