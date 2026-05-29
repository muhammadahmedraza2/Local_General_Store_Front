import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/Interfaces/product.model';

export interface PaginatedProducts {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'http://localhost:5000/api/Products';

  constructor(private http: HttpClient) {}

  // =========================
  // GET PAGINATED PRODUCTS
  // =========================
  getProducts(
    pageNumber: number = 1,
    pageSize: number = 100
  ): Observable<PaginatedProducts> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<PaginatedProducts>(
      this.api,
      { params }
    );
  }

  // =========================
  // GET PRODUCT BY ID
  // =========================
  getProductById(id: number) {
    return this.http.get<Product>(
      `${this.api}/${id}`
    );
  }
}