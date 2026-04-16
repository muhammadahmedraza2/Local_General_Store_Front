import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private api = 'http://localhost:5000/api/Orders';

  private ordersSubject = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 📥 GET Orders (only when needed)
  getOrders() {
    return this.http.get<any[]>(this.api);
  }

  getOrdersByUser(userId: string) {
  return this.http.get<any[]>(`${this.api}/user/${userId}`);
}

  // 🔄 Refresh Orders manually
  loadOrders() {
    this.getOrders().subscribe(res => {
      this.ordersSubject.next(res);
    });
  }

  // ➕ POST Order (checkout only)
  placeOrder(order: any) {
    return this.http.post(this.api, order);
  }
}