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

  constructor(private http: HttpClient) {
    this.loadOrders();
  }

  // 📥 GET from API
  getOrders() {
    return this.http.get<any[]>(this.api);
  }

  // 🔄 LOAD into state
  loadOrders() {
    this.getOrders().subscribe(res => {
      this.ordersSubject.next(res);
    });
  }

  // ➕ PLACE ORDER (checkout)
  placeOrder(order: any) {
    return this.http.post(this.api, order);
  }
}