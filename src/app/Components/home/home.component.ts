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

  // PRODUCTS
  products: any[] = [];
  allProducts: any[] = [];

  // FILTER
  isFilterOpen = false;
  categories: string[] = [];
  selectedCategory = '';
  selectedProduct = '';
  priceMin = 0;
  priceMax = 100000;

  // STORE INFO
  storeName: string = 'Smart General Store';
  storeLogo: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  // ngOnInit() {

  //   // =========================
  //   // GET USER FROM LOCAL STORAGE
  //   // =========================
  //   const userData = localStorage.getItem('user');

  //   if (userData) {

  //     const user = JSON.parse(userData);

  //     // STORE NAME
  //     this.storeName =
  //       user.storeName || 'Smart General Store';

  //     // STORE LOGO
  //     this.storeLogo =
  //       user.storeLogo || '';

  //   }

  //   // =========================
  //   // GET PRODUCTS
  //   // =========================
  //   this.productService.getProducts().subscribe((res: any) => {

  //     this.allProducts = res;

  //     this.products = res;

  //     this.categories = [
  //       ...new Set<string>(
  //         res.map((p: any) => p.category as string)
  //       )
  //     ];

  //   });

  // }

  // =========================
  // FILTER OPEN/CLOSE
  // =========================
  
  ngOnInit() {

  const userData = localStorage.getItem('user');

  console.log('RAW userData:', userData);

  if (!userData) {
    console.log('❌ No user found in localStorage');
    return;
  }

  const user = JSON.parse(userData);

  console.log('PARSED USER:', user);

  // STORE NAME CHECK
  this.storeName = user?.storeName ?? 'Smart General Store';

  // STORE LOGO CHECK
  this.storeLogo = user?.storeLogo
    ? 'https://localhost:7215/Uploads/' + user.storeLogo
    : '';

  console.log('FINAL STORE NAME:', this.storeName);
  console.log('FINAL STORE LOGO:', this.storeLogo);
}
  
  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  // =========================
  // APPLY FILTER
  // =========================
  applyFilter() {

    this.products = this.allProducts.filter(p =>

      (!this.selectedCategory ||
        p.category === this.selectedCategory)

      &&

      (!this.selectedProduct ||
        p.name === this.selectedProduct)

      &&

      (
        p.price >= this.priceMin &&
        p.price <= this.priceMax
      )

    );

  }

  // =========================
  // RESET PRICE
  // =========================
  resetPrice() {

    this.priceMin = 0;
    this.priceMax = 100000;

    this.applyFilter();

  }

  // =========================
  // RESET ALL
  // =========================
  resetAll() {

    this.selectedCategory = '';
    this.selectedProduct = '';

    this.resetPrice();

  }

  // =========================
  // ADD TO CART
  // =========================
  addToCart(product: any) {

    this.cartService.addToCart(product);

    this.router.navigate(['/cart']);

  }

  getStoreLogo(): string {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const logo = user?.storeLogo;
  return logo 
    ? 'http://localhost:5000/Uploads/' + logo 
    : 'assets/default-store.png';
}

}