import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.orders$.subscribe(res => {
      this.orders = res;
    });
  }

}