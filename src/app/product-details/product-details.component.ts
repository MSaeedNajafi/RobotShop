import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  // product!: IProduct;
  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

  cart: IProduct[] = [];

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName;
  }

  buyButtonClicked(product: IProduct) {
    this.buy.emit();
  }

  getDiscountedProductClasses(product: IProduct) {
    if (product.discount > 0) return 'strikeThrough';
    return '';
  }
}
