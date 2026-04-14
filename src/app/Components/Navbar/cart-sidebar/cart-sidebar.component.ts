import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent implements OnInit {

  cartItems: any[] = [];
  isOpen: boolean = false;

  // constructor(private cartService: CartService) {}
  constructor(
  private cartService: CartService,
  private orderService: OrderService
) {}

  ngOnInit(): void {

    // 🛒 CART DATA
    this.cartService.cart$.subscribe((items: any[]) => {
      this.cartItems = items;
    });

    // 📌 SIDEBAR STATE
    this.cartService.sidebar$.subscribe((status: boolean) => {
      this.isOpen = status;
    });

    // 🔄 LOAD INITIAL CART
    this.cartService.loadCart();
  }

  // 💰 SUBTOTAL
  get subtotal() {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  // ➕ INCREASE QTY
  increase(item: any) {
    item.quantity++;
  }

  // ➖ DECREASE QTY
  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // 🗑️ REMOVE ITEM
  remove(item: any) {
    this.cartItems = this.cartItems.filter(x => x !== item);
  }

  // ❌ CLOSE SIDEBAR
  close() {
    this.cartService.closeSidebar();
  }

  checkout() {
  const order = {
    orderNumber: 'ORD-' + Date.now(),
    date: new Date().toDateString(),
    status: 'Waiting for delivery',
    total: this.subtotal + 10,
    items: this.cartItems
  };

  this.orderService.placeOrder(order).subscribe({
    next: () => {
      alert('Order placed successfully!');

      this.cartService.clearCart();   // empty cart
      this.cartService.loadCart();     // refresh UI
      this.close();                    // sidebar close
    }
  });
}
}