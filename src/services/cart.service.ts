import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private api = 'http://localhost:5000/api/Cart';

  // 🛒 CART STATE
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  // 📌 SIDEBAR STATE
  private sidebarSubject = new BehaviorSubject<boolean>(false);
  sidebar$ = this.sidebarSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart(); // 🔥 app start pe cart load
  }

  // 🔄 GET CART FROM API
  getCart() {
    return this.http.get<any[]>(this.api);
  }

  // 📥 LOAD CART INTO STATE
  loadCart() {
    this.getCart().subscribe({
      next: (res) => this.cartSubject.next(res),
      error: (err) => console.log(err)
    });
  }

  // ➕ ADD TO CART
  addToCart(product: any) {
    const body = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };

    return this.http.post(`${this.api}/add`, body);
  }

  // ❌ REMOVE ITEM
  removeItem(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  // 📌 SIDEBAR CONTROL
  openSidebar() {
    this.sidebarSubject.next(true);
  }

  closeSidebar() {
    this.sidebarSubject.next(false);
  }

  toggleSidebar(status: boolean) {
    this.sidebarSubject.next(status);
  }

clearCart() {
  this.http.delete(this.api).subscribe(() => {
    this.cartSubject.next([]);
  });
}

}