import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/Interfaces/product.model';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  groupedProducts: any = {};
  categories: string[] = [];

  
constructor(
  private productService: ProductService,
  private cartService: CartService
) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      this.groupByCategory();
    });
  }

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


onAddToCart(product: Product) {
  this.cartService.addToCart(product).subscribe(() => {
    alert('Added to cart');
  });
}
}