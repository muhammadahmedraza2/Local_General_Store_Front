import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  // ✅ Orders se notifications generate karna
  getNotificationsFromOrders(orders: any[]): any[] {

    if (!orders || orders.length === 0) return [];

    const notifications: any[] = [];

    orders.forEach(order => {

      const orderNo = order.orderNumber || order.id;

      switch (order.status) {

        case 'Pending':
          notifications.push({
            orderId: orderNo,
            message: 'Your order is pending and waiting for confirmation',
            status: 'Pending',
            createdAt: order.createdAt
          });
          break;

        case 'Processing':
          notifications.push({
            orderId: orderNo,
            message: 'Your order is being processed',
            status: 'Processing',
            createdAt: order.createdAt
          });
          break;

        case 'Delivered':
          notifications.push({
            orderId: orderNo,
            message: 'Your order has been delivered successfully',
            status: 'Delivered',
            createdAt: order.createdAt
          });
          break;

        case 'Cancelled':
          notifications.push({
            orderId: orderNo,
            message: 'Your order has been cancelled',
            status: 'Cancelled',
            createdAt: order.createdAt
          });
          break;

        default:
          notifications.push({
            orderId: orderNo,
            message: 'Order update available',
            status: order.status,
            createdAt: order.createdAt
          });
          break;
      }

    });

    // latest first
    return notifications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

}