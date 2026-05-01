import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';
// import { ProductService } from 'src/app/services/product.service';
// import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router   // 👈 add this

  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);   // item add

    this.router.navigate(['/cart']);       // 👈 redirect to cart page
  }

  // addToCart(product: any) {
  //   this.cartService.addToCart(product).subscribe({
  //     next: () => {
  //       this.cartService.loadCart();   // refresh cart
  //       this.cartService.openSidebar(); // open sidebar
  //     }
  //   });
  // }
}