import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  cartItems: any[] = [];
  today = new Date();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // this.cartItems = this.cartService.getCart(); // 🔥 FIXED
  }

  get total() {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.price * (item.qty || 1));
    }, 0);
  }
}