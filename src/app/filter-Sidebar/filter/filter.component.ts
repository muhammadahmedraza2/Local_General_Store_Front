import { Component, OnInit } from '@angular/core';
import { Product } from 'src/Interfaces/product.model';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  allProducts: Product[] = [];
  filtered: Product[] = [];
  categories: string[] = [];

  selectedCategory = '';
  selectedProduct = '';
  priceMin = 0;
  priceMax = 1000;
  activeStock: string[] = ['In Stock'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.allProducts = data;
      this.filtered = data;
      this.categories = [...new Set(data.map(p => p.category))];
    });
  }

  applyFilter() {
    this.filtered = this.allProducts.filter(p =>
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      (!this.selectedProduct || p.name === this.selectedProduct) &&
      (p.price >= this.priceMin && p.price <= this.priceMax) &&
      (this.activeStock.length === 0 || this.activeStock.includes(p.stock))
    );
  }

  isStockActive(val: string): boolean {
    return this.activeStock.includes(val);
  }

  toggleStock(val: string) {
    if (this.activeStock.includes(val)) {
      this.activeStock = this.activeStock.filter(v => v !== val);
    } else {
      this.activeStock.push(val);
    }
    this.applyFilter();
  }

  resetPrice() {
    this.priceMin = 0;
    this.priceMax = 1000;
    this.applyFilter();
  }

  resetAll() {
    this.selectedCategory = '';
    this.selectedProduct = '';
    this.activeStock = ['In Stock'];
    this.resetPrice();
  }
}