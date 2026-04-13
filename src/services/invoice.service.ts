import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private api = 'http://localhost:3000/invoice';

  constructor(private http: HttpClient) {}

  generateInvoice(data: any) {
    return this.http.post(this.api, data);
  }
}
