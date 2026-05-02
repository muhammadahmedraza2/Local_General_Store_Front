import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { OrderService } from 'src/services/order.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  notificationsCount = 0;

  isCollapsed = false;
  user: any = {};

  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.loadNotifications();
  }

  loadNotifications() {

    let userId = localStorage.getItem('userId');

    if (!userId) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      userId = user?.userId || user?.id;
    }

    if (!userId) return;

    this.orderService.getOrdersByUser(userId).subscribe({
      next: (res) => {
        const notifications = this.notificationService.getNotificationsFromOrders(res);
        this.notificationsCount = notifications.length;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.auth.logout();
  }
}