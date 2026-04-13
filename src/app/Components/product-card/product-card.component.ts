import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductComponent {

  @Input() product: any;
  @Output() add = new EventEmitter<any>();

  addToCart() {
    this.add.emit(this.product);
  }

}
