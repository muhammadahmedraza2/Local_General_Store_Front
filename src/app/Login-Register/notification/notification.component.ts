import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/services/notification.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationsComponent implements OnInit {

  orders: any[] = [];
  notifications: any[] = [];

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    let userId = localStorage.getItem('userId') || '';

    if (!userId) return;

    this.orderService.getOrdersByUser(userId).subscribe(res => {
      this.orders = res;
      this.notifications = this.notificationService.getNotificationsFromOrders(res);
    });
  }
}