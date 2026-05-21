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

  private imageCache = new Map<string, string>();

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items || [];
    });
  }

  // =========================
  // SUBTOTAL
  // =========================
  get subtotal(): number {
    return this.cartItems.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0);
  }

  // =========================
  // QUANTITY CONTROL
  // =========================
  increase(item: any) {
    this.cartService.updateQty(item.productId, item.quantity + 1);
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQty(item.productId, item.quantity - 1);
    } else {
      this.remove(item);
    }
  }

  remove(item: any) {
    this.cartService.removeItem(item.productId);
  }

  // =========================
  // IMAGE OPTIMIZED (NO LOOP ISSUE)
  // =========================
  getImageUrl(image: string): string {

    if (!image) {
      return 'https://via.placeholder.com/80x80?text=No+Image';
    }

    if (image.startsWith('http')) {
      return image;
    }

    // CACHE FIX (IMPORTANT)
    if (this.imageCache.has(image)) {
      return this.imageCache.get(image)!;
    }

    const url = `http://localhost:5000/Uploads/${image}`;
    this.imageCache.set(image, url);

    return url;
  }

  // =========================
  // IMAGE ERROR HANDLER
  // =========================
  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
  }

  // =========================
  // CHECKOUT (OPTIMIZED)
  // =========================
  checkout() {

    let userId = localStorage.getItem('userId');

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!userId) {
      userId = String(user?.userId || user?.id || '');
    }

    if (!userId) {
      alert('Please login again!');
      return;
    }

    if (!this.cartItems.length) {
      alert('Cart is empty!');
      return;
    }

    const order = {
      orderNumber: 'ORD-' + Date.now(),
      totalAmount: this.subtotal,
      status: 'Pending',
      userId: userId,
      userName: user?.name || user?.fullName || '',

      items: this.cartItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image || ''
      }))
    };

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