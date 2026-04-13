import { Component, OnInit } from '@angular/core';
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
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}