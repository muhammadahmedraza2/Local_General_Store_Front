import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/Interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private api = 'http://localhost:3000/products';
    private api = 'http://localhost:5000/api/Products'; // 🔥 FIXED


  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.api); // 🔥 FIXED TYPE
  }

  getProductById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }
}