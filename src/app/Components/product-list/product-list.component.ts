import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/Interfaces/product.model';
import { CartService } from 'src/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  groupedProducts: any = {};
  categories: string[] = [];

  // =========================
  // PAGINATION
  // =========================
  pageNumber = 1;
  pageSize = 100;
  totalPages = 0;
  totalRecords = 0;

  loading = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  // =========================
  // LOAD PRODUCTS
  // =========================
  loadProducts() {

    this.loading = true;

    this.productService
      .getProducts(this.pageNumber, this.pageSize)
      .subscribe({
        next: (res) => {

          this.products = res.data;

          this.totalPages = res.totalPages;
          this.totalRecords = res.totalRecords;

          this.groupByCategory();

          this.loading = false;
        },

        error: (err) => {
          console.log(err);
          this.loading = false;
        }
      });
  }

  // =========================
  // GROUP CATEGORY
  // =========================
  groupByCategory() {

    this.groupedProducts = {};

    this.products.forEach(p => {

      if (!this.groupedProducts[p.category]) {
        this.groupedProducts[p.category] = [];
      }

      this.groupedProducts[p.category].push(p);
    });

    this.categories = Object.keys(this.groupedProducts);
  }

  // =========================
  // NEXT PAGE
  // =========================
  nextPage() {

    if (this.pageNumber < this.totalPages) {

      this.pageNumber++;

      this.loadProducts();
    }
  }

  // =========================
  // PREVIOUS PAGE
  // =========================
  previousPage() {

    if (this.pageNumber > 1) {

      this.pageNumber--;

      this.loadProducts();
    }
  }

  // =========================
  // ADD TO CART
  // =========================
  addToCart(product: any) {

    this.cartService.addToCart(product);

    this.router.navigate(['/cart']);
  }
}