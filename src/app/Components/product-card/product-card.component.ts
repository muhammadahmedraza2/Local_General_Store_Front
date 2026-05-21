import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product: any;
  @Output() add = new EventEmitter<any>();

  addToCart() {
    this.add.emit(this.product);
  }
// IMAGE URL
getImageUrl(image: string): string {

  // no image
  if (!image) {
    return 'assets/download (1).png';
  }

  // full URL from API
  if (
    image.startsWith('http://') ||
    image.startsWith('https://')
  ) {
    return image;
  }

  // local image
  return `http://localhost:5000/${image}`;
}


// IMAGE ERROR
onImgError(event: any) {

  event.target.src =
    'assets/download (1).png';

}

}