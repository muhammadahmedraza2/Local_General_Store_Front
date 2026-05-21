import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: any[] = [];
  filteredOrders: any[] = [];
  loading = true;
  searchText = '';
  selectedStatus = '';
  expandedOrder: string | null = null;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // loadOrders() {
  //   // ✅ userId lo — logout ke baad bhi kaam kare
  //   let userId = localStorage.getItem('userId');

  //   if (!userId) {
  //     const user = JSON.parse(localStorage.getItem('user') || '{}');
  //     userId = String(user?.userId || user?.id || '');
  //   }

  //   if (!userId || userId === 'undefined') {
  //     this.loading = false;
  //     alert('Please login to view order history!');
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   this.orderService.getOrdersByUser(userId).subscribe({
  //     next: (res) => {
  //       this.orders = res;
  //       this.filteredOrders = res;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.loading = false;
  //     }
  //   });
  // }

// OrderHistoryComponent mein loadOrders() fix:
loadOrders() {
  let userId = localStorage.getItem('userId');

  if (!userId) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    userId = String(user?.userId || user?.id || '');
  }

  console.log('🔍 userId being sent:', userId); // ← yeh dekho console mein

  if (!userId || userId === 'undefined' || userId === 'null') {
    this.loading = false;
    alert('Please login to view order history!');
    this.router.navigate(['/login']);
    return;
  }

  this.orderService.getOrdersByUser(userId).subscribe({
    next: (res) => {
      console.log('✅ Orders received:', res); // ← kitne orders aaye
      this.orders = res;
      this.filteredOrders = res;
      this.loading = false;
    },
    error: (err) => {
      console.error('❌ Order fetch error:', err); // ← exact error dekho
      this.loading = false;
    }
  });
}

  // ✅ Search
  search(event: any) {
    const val = event.target.value.toLowerCase();
    this.searchText = val;
    this.applyFilter();
  }

  // ✅ Status filter
  filterByStatus(status: string) {
    this.selectedStatus = status;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredOrders = this.orders.filter(o => {
      const matchSearch = !this.searchText ||
        o.orderNumber.toLowerCase().includes(this.searchText) ||
        o.items.some((i: any) => i.productName.toLowerCase().includes(this.searchText));

      const matchStatus = !this.selectedStatus ||
        o.status === this.selectedStatus;

      return matchSearch && matchStatus;
    });
  }

  // ✅ Expand/Collapse order
  toggleOrder(orderNumber: string) {
    this.expandedOrder = this.expandedOrder === orderNumber ? null : orderNumber;
  }

  // ✅ Total items
  totalItems(order: any): number {
    return order.items.reduce((s: number, i: any) => s + i.quantity, 0);
  }

  // ✅ Image URL
  getImageUrl(image: string): string {
    if (!image) return 'https://via.placeholder.com/50x50?text=No+Image';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return 'http://localhost:5000/Uploads/' + image;
  }

  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
  }

  // ✅ Status badge color
  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending': return 'badge-pending';
      case 'delivered': return 'badge-delivered';
      case 'cancelled': return 'badge-cancelled';
      case 'processing': return 'badge-processing';
      default: return 'badge-default';
    }
  }

  // ✅ Date format
  formatDate(date: string): string {
    if (!date) return '--';
    return new Date(date).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  goShopping() {
    this.router.navigate(['/']);
  }
}