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

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    // 🛒 CART DATA (reactive)
    this.cartService.cart$.subscribe((items: any[]) => {
      this.cartItems = items;
    });

    // 📌 SIDEBAR STATE
    this.cartService.sidebar$.subscribe((status: boolean) => {
      this.isOpen = status;
    });

    // ❌ REMOVE THIS (ab exist nahi karta)
    // this.cartService.loadCart();
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
    this.cartService.saveCart(this.cartItems); // 🔥 update localStorage
  }

  // ➖ DECREASE QTY
  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.saveCart(this.cartItems); // 🔥 update
    }
  }

  // 🗑️ REMOVE ITEM
  remove(item: any) {
    this.cartService.removeItem(item.productId); // ✅ service use karo
  }

  // ❌ CLOSE SIDEBAR
  close() {
    this.cartService.closeSidebar();
  }

  // 💳 CHECKOUT
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
        alert('Order placed successfully! ✅');

        this.cartService.clearCart();   // 🧹 clear local cart
        this.close();                  // sidebar close
      },
      error: () => {
        alert('Something went wrong ❌');
      }
    });
  }
}