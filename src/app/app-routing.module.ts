import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/Navbar/layout/layout.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: '', component: HomeComponent },
      // { path: 'cart', component: CartComponent },
      // // { path: 'product', component: ProductCardComponent },
      // { path: 'product', component: ProductListComponent },
      // { path: 'invoice', component: InvoiceComponent }
      { path: '', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'order-history', component: OrderHistoryComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
