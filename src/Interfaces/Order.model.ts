export interface Order {
  orderNumber: string;
  date: string;
  total: number;
  status: string;
  items: any[];
}