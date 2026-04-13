import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private api = 'http://localhost:3000/cart';
  cartItems: any[] = [];

  constructor(private http: HttpClient) {}

  // Add item to cart
  addToCart(item: any) {
    return this.http.post(this.api, item);
  }

  // Get cart items
  getCart() {
    return this.http.get(this.api);
  }

  // ❌ Remove item from cart
  removeItem(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}