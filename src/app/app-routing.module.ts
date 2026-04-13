import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/Navbar/layout/layout.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'invoice', component: InvoiceComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
