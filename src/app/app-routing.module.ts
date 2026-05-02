import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './Components/Navbar/layout/layout.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';

import { RegistrationComponent } from './Login-Register/registration/registration.component';
import { LoginComponent } from './Login-Register/login/login.component';
import { ProfileComponent } from './Login-Register/profile/profile.component';

import { AuthGuard } from 'src/Guard/auth.guard';
import { NotFoundComponent } from './NotFounded/not-found/not-found.component';
import { CategoryComponent } from './Components/category/category.component';
import { NotificationsComponent } from './Login-Register/notification/notification.component';

const routes: Routes = [

  // Public Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  // Protected Layout Routes
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'notifications', component: NotificationsComponent }
    ]
  },

  // 404 Route (Always Last)
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }