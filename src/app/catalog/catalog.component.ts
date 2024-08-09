import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
// class in typescript are public
// product ncan be private like: private product, in order to access this in the template however this should be public
export class CatalogComponent {
  products: any;
  // products: IProduct[];
  filter: string = '';

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService
  ) {}

  ngOnInit() {
    // returns an obersable
    this.productSvc.getProducts().subscribe((products) => {
      this.products = products;
    });
    // When dealing with https calls that retun obersables,
    // You must subscribe to the http call, and when you do that
    // Actually executes the HTTP call
    // Calling the method doesnt do it, since it retuens an observable, you needs to subscribe to it
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter(
          (product: any) => product.category === this.filter
        );
  }

  getDiscountedProductClasses(product: IProduct) {
    if (product.discount > 0) return 'strikeThrough';
    return '';
  }
}
