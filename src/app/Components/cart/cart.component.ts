import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
// import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
  }

  increase(item: any) {
    item.qty++;
  }

  decrease(item: any) {
    if (item.qty > 1) {
      item.qty--;
    }
  }

  remove(id: number) {
    this.cartService.removeItem(id);
    this.cartItems = this.cartService.cartItems;
  }

  get total() {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.price * item.qty);
    }, 0);
  }
}