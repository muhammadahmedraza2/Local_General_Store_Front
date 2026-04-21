import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/Navbar/layout/layout.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';
import { RegistrationComponent } from './Login-Register/registration/registration.component';
import { LoginComponent } from './Login-Register/login/login.component';
import { AuthGuard } from 'src/Guard/auth.guard';
import { ProfileComponent } from './Login-Register/profile/profile.component';

const routes: Routes = [

  // ✅ public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],   // ⭐ PROTECTION
    children: [
      { path: '', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
