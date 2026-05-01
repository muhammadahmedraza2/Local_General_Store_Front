import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {

  // ✅ Cart state — sirf memory mein
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  // ✅ Sidebar state
  private sidebarSubject = new BehaviorSubject<boolean>(false);
  sidebar$ = this.sidebarSubject.asObservable();

  // ✅ Item add karo
  addToCart(product: any) {
    const cart = this.cartSubject.value;
    const existing = cart.find(x => x.productId === product.id);

    if (existing) {
      existing.quantity += 1;
      this.cartSubject.next([...cart]);
    } else {
      this.cartSubject.next([...cart, {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        image: product.imageUrl || product.image || ''
      }]);
    }
  }

  // ✅ Item remove karo
  removeItem(productId: number) {
    const updated = this.cartSubject.value.filter(x => x.productId !== productId);
    this.cartSubject.next(updated);
  }

  // ✅ Qty update karo
  updateQty(productId: number, qty: number) {
    const cart = this.cartSubject.value.map(x =>
      x.productId === productId ? { ...x, quantity: qty } : x
    );
    this.cartSubject.next(cart);
  }

  // ✅ Cart clear karo
  clearCart() {
    this.cartSubject.next([]);
  }

  // ✅ Total
  getTotal(): number {
    return this.cartSubject.value.reduce((sum, item) =>
      sum + item.price * item.quantity, 0);
  }

  // ✅ Sidebar
  openSidebar() { this.sidebarSubject.next(true); }
  closeSidebar() { this.sidebarSubject.next(false); }
}