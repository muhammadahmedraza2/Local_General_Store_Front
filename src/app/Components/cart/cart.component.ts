import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // ✅ Local reactive cart
    this.cartService.cart$.subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }
}