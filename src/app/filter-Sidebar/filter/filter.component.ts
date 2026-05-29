import { Component, OnInit } from '@angular/core';
import { Product } from 'src/Interfaces/product.model';
import { ProductService } from 'src/services/product.service';

export interface PaginatedProducts {
  data: Product[];
  totalPages: number;
  totalRecords: number;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  // =========================
  // PRODUCTS
  // =========================
  allProducts: Product[] = [];
  filtered: Product[] = [];
  categories: string[] = [];

  // =========================
  // FILTERS
  // =========================
  selectedCategory = '';
  selectedProduct = '';

  priceMin = 0;
  priceMax = 1000;

  activeStock: string[] = ['In Stock'];

  // =========================
  // PAGINATION
  // =========================
  pageNumber = 1;
  pageSize = 100;

  loading = false;

  constructor(
    private productService: ProductService
  ) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {

    this.loadProducts();

  }

  // =========================
  // LOAD PRODUCTS
  // =========================
  loadProducts(): void {

    this.loading = true;

    this.productService
      .getProducts(this.pageNumber, this.pageSize)
      .subscribe({

        next: (res: PaginatedProducts) => {

          // ✅ products array
          this.allProducts = res.data;

          // ✅ filtered default
          this.filtered = res.data;

          // ✅ unique categories
          this.categories = [
            ...new Set(
              res.data.map((p: Product) => p.category)
            )
          ];

          this.loading = false;
        },

        error: (err) => {

          console.log('PRODUCT LOAD ERROR:', err);

          this.loading = false;
        }

      });

  }

  // =========================
  // APPLY FILTER
  // =========================
  applyFilter(): void {

    this.filtered = this.allProducts.filter((p: Product) =>

      // CATEGORY
      (!this.selectedCategory ||
        p.category === this.selectedCategory)

      &&

      // PRODUCT
      (!this.selectedProduct ||
        p.name === this.selectedProduct)

      &&

      // PRICE
      (
        p.price >= this.priceMin &&
        p.price <= this.priceMax
      )

      &&

      // STOCK
      (
        this.activeStock.length === 0 ||
        this.activeStock.includes(p.stock)
      )

    );

  }

  // =========================
  // STOCK ACTIVE
  // =========================
  isStockActive(val: string): boolean {

    return this.activeStock.includes(val);

  }

  // =========================
  // TOGGLE STOCK
  // =========================
  toggleStock(val: string): void {

    if (this.activeStock.includes(val)) {

      this.activeStock =
        this.activeStock.filter(v => v !== val);

    } else {

      this.activeStock.push(val);

    }

    this.applyFilter();

  }

  // =========================
  // RESET PRICE
  // =========================
  resetPrice(): void {

    this.priceMin = 0;
    this.priceMax = 1000;

    this.applyFilter();

  }

  // =========================
  // RESET ALL
  // =========================
  resetAll(): void {

    this.selectedCategory = '';

    this.selectedProduct = '';

    this.activeStock = ['In Stock'];

    this.priceMin = 0;
    this.priceMax = 1000;

    this.filtered = [...this.allProducts];

  }

}