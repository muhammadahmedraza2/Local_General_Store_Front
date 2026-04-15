import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private api = 'http://localhost:5000/api/Orders';

  // 🛒 CART STATE
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  // 📌 SIDEBAR STATE
  private sidebarSubject = new BehaviorSubject<boolean>(false);
  sidebar$ = this.sidebarSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadLocalCart(); // 🔥 localStorage se load
  }

  // =========================
  // 🛒 LOCAL CART METHODS
  // =========================

  // 📥 LOAD FROM LOCAL STORAGE
  loadLocalCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartSubject.next(JSON.parse(saved));
    }
  }

  // 💾 SAVE TO LOCAL STORAGE
  saveCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // ➕ ADD TO CART (NO API)
  addToCart(product: any) {
    const cart = this.cartSubject.value;

    const existing = cart.find(x => x.productId === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      });
    }

    this.cartSubject.next([...cart]);
    this.saveCart(cart);
  }

  // ➖ REMOVE ITEM
  removeItem(id: number) {
    const updated = this.cartSubject.value.filter(x => x.productId !== id);
    this.cartSubject.next(updated);
    this.saveCart(updated);
  }

  // 🔄 CLEAR CART
  clearCart() {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }

  // =========================
  // 💳 CHECKOUT (API CALL)
  // =========================

  // checkout() {
  //   const cart = this.cartSubject.value;
  //   // return this.http.post(`${this.api}/checkout`, cart);
  // }

checkout() {
  const cart = this.cartSubject.value;

  const order = {
    orderNumber: 'ORD-' + Date.now(),
    totalAmount: this.getTotal(),
    items: cart
  };

  return this.http.post(this.api, order);
}

getTotal() {
  return this.cartSubject.value.reduce((sum, item) =>
    sum + item.price * item.quantity, 0);
}

  // =========================
  // 📌 SIDEBAR CONTROL
  // =========================

  openSidebar() {
    this.sidebarSubject.next(true);
  }

  closeSidebar() {
    this.sidebarSubject.next(false);
  }
}