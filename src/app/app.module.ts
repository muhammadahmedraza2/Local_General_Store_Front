import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';
import { ProductComponent } from './Components/product-card/product-card.component';
import { LayoutComponent } from './Components/Navbar/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    InvoiceComponent,
    ProductComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule   // ✅ correct module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }