import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Products
  products: any[] = [];
  allProducts: any[] = [];

  // Filter
  isFilterOpen = false;
  categories: string[] = [];
  selectedCategory = '';
  selectedProduct = '';
  priceMin = 0;
  priceMax = 100000;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((res: any) => {
      this.allProducts = res;
      this.products = res;
      this.categories = [...new Set<string>(res.map((p: any) => p.category as string))];
    });
  }

  // Filter open/close
  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  applyFilter() {
    this.products = this.allProducts.filter(p =>
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      (!this.selectedProduct || p.name === this.selectedProduct) &&
      (p.price >= this.priceMin && p.price <= this.priceMax)
    );
  }

  resetPrice() {
    this.priceMin = 0;
    this.priceMax = 100000;
    this.applyFilter();
  }

  resetAll() {
    this.selectedCategory = '';
    this.selectedProduct = '';
    this.resetPrice();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }
}