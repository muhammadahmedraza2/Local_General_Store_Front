import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.api);
  }

  getProductById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }
}