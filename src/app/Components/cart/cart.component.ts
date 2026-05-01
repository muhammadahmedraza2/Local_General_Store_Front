import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  loading = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  // ✅ Subtotal
  get subtotal(): number {
    return this.cartItems.reduce((sum, item) =>
      sum + item.price * item.quantity, 0);
  }

  // ✅ Qty increase
  increase(item: any) {
    this.cartService.updateQty(item.productId, item.quantity + 1);
  }

  // ✅ Qty decrease
  decrease(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQty(item.productId, item.quantity - 1);
    } else {
      this.remove(item);
    }
  }

  // ✅ Remove
  remove(item: any) {
    this.cartService.removeItem(item.productId);
  }

  // ✅ Image URL handle
  getImageUrl(image: string): string {
    if (!image) return 'https://via.placeholder.com/80x80?text=No+Image';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return 'http://localhost:5000/Uploads/' + image;
  }

  // ✅ Image error
  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
  }

  // ✅ CHECKOUT — Database mein save
checkout() {
  // ✅ Saari jagah se userId try karo
  let userId = localStorage.getItem('userId');
  
  if (!userId) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    userId = String(user?.userId || user?.id || '');
  }

  console.log('UserId:', userId); // ← check karo

  if (!userId || userId === 'undefined' || userId === '') {
    alert('Please logout and login again!');
    return;
  }

  if (this.cartItems.length === 0) {
    alert('Cart is empty!');
    return;
  }

  const order = {
    orderNumber: 'ORD-' + Date.now(),
    totalAmount: this.subtotal,
    status: 'Pending',
    userId: userId,         // ✅ ab sahi value hogi
    items: this.cartItems.map(item => ({
      productId: item.productId,
      productName: item.productName,
      price: Number(item.price),
      quantity: Number(item.quantity),
      image: item.image || ''
    }))
  };

  console.log('ORDER:', order); // ← full order dekho

  this.loading = true;

  this.orderService.placeOrder(order).subscribe({
    next: () => {
      this.loading = false;
      this.cartService.clearCart();
      alert('Order placed successfully! ✅');
      this.router.navigate(['/order-history']);
    },
    error: (err) => {
      this.loading = false;
      console.error('Order Error:', err);
      alert('Order failed! ❌');
    }
  });
}
}