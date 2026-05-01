import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent  {

//   cartItems: any[] = [];
//   isOpen = false;

//   constructor(
//     private cartService: CartService,
//     private orderService: OrderService
//   ) {}

//   ngOnInit(): void {

//     // 🛒 cart stream
//     this.cartService.cart$.subscribe(items => {
//       this.cartItems = items;
//     });

//     // 📌 sidebar state
//     this.cartService.sidebar$.subscribe(status => {
//       this.isOpen = status;
//     });
//   }

//   // 💰 subtotal
//   get subtotal(): number {
//     return this.cartItems.reduce((sum, item) =>
//       sum + item.price * item.quantity, 0);
//   }

//   // ➕ increase
//   increase(item: any) {
//     item.quantity++;
//     this.cartService.saveCart(this.cartItems);
//   }

//   // ➖ decrease
//   decrease(item: any) {
//     if (item.quantity > 1) {
//       item.quantity--;
//       this.cartService.saveCart(this.cartItems);
//     }
//   }

//   // 🗑️ remove
//   remove(item: any) {
//     this.cartService.removeItem(item.productId);
//   }

//   // ❌ close sidebar
//   close() {
//     this.cartService.closeSidebar();
//   }

//   // 💳 CHECKOUT (ONLY HERE API CALL HOGA)

//   checkout() {

//   const userId = localStorage.getItem('userId');

//   if (!userId) {
//     alert('User not logged in ❌');
//     return;
//   }

//   if (this.cartItems.length === 0) {
//     alert('Cart is empty ❌');
//     return;
//   }

//   const order = {
//     orderNumber: 'ORD-' + Date.now(),
//     totalAmount: Number(this.subtotal + 10),
//     status: 'Pending',
//     userId: userId,

//     items: this.cartItems.map(item => ({
//       productId: item.productId,
//       productName: item.productName,
//       price: Number(item.price),
//       quantity: Number(item.quantity),
//       image: item.image
//     }))
//   };

//   console.log("ORDER:", order); // 🔥 DEBUG

//   this.orderService.placeOrder(order).subscribe({
//     next: () => {
//       alert('Order placed successfully ✅');
//       this.cartService.clearCart();
//       this.close();
//     },
//     error: (err) => {
//       console.error("ERROR:", err);
//       alert('Order failed ❌');
//     }
//   });
// }

  // checkout() {

//   const order = {
//     orderNumber: 'ORD-' + Date.now(),
//     date: new Date(),
//     status: 'Waiting for delivery',
//     total: this.subtotal + 10,

//     // 🔥 IMPORTANT: clean mapping
//     items: this.cartItems.map(item => ({
//       productId: item.productId,
//       productName: item.productName,
//       price: item.price,
//       quantity: item.quantity
//     }))
//   };

//   this.orderService.placeOrder(order).subscribe({
//     next: () => {

//       alert('Order placed successfully ✅');

//       this.cartService.clearCart();
//       this.close();

//       this.orderService.loadOrders();
//     },

//     error: (err) => {
//       console.error(err);
//       alert('Order failed ❌');
//     }
//   });
// }
}