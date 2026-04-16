import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: any[] = [];
  userId: string | null = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.orderService.getOrdersByUser(this.userId).subscribe({
        next: (res) => {
          this.orders = res;
        },
        error: (err) => {
          console.error('Error loading orders', err);
        }
      });
    }
  }
}