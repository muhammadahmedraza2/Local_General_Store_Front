import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private api = 'http://localhost:5000/api/Orders';

  constructor(private http: HttpClient) {}

  // ✅ Order place karo
  placeOrder(order: any) {
    return this.http.post<any>(this.api, order);
  }

  // ✅ Sab orders lo
  getOrders() {
    return this.http.get<any[]>(this.api);
  }

  // ✅ User ke orders lo
  // getOrdersByUser(userId: string) {
  //   return this.http.get<any[]>(`${this.api}?userId=${userId}`);
  // }

    getOrdersByUser(userId: string) {
    return this.http.get<any[]>(`${this.api}/user/${userId}`);
  }

}