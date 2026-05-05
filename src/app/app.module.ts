import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';
import { LayoutComponent } from './Components/Navbar/layout/layout.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { CartSidebarComponent } from './Components/Navbar/cart-sidebar/cart-sidebar.component';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';
import { LoginComponent } from './Login-Register/login/login.component';
import { RegistrationComponent } from './Login-Register/registration/registration.component';
import { ProfileComponent } from './Login-Register/profile/profile.component';
import { NotFoundComponent } from './NotFounded/not-found/not-found.component';
import { CategoryComponent } from './Components/category/category.component';
import { FooterComponent } from './Login-Register/footer/footer.component';
import { NotificationsComponent } from './Login-Register/notification/notification.component';
import { FilterComponent } from './filter-Sidebar/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    InvoiceComponent,
    LayoutComponent,
    ProductListComponent,
    ProductCardComponent,
    CartSidebarComponent,
    OrderHistoryComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    NotFoundComponent,
    CategoryComponent,
    FooterComponent,
    NotificationsComponent,
    FilterComponent // ✅ OK NOW
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    // ❌ CommonModule NOT needed here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }