import { Injectable } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // BehaviorSubject, its another type of rxjs observable
  // which is used to always emit the latest value to new subscriber
  // storing a copy of cart in ourt cart service, as well as on the server via api call
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(
    []
  );

  constructor(private http: HttpClient) {
    this.http.get<IProduct[]>('/api/cart').subscribe({
      next: (cart) => this.cart.next(cart),
    });
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct) {
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('added ' + product.name + ' to cart!');
    });

    // this.cart.push(product);
    // this.http.post('/api/cart', this.cart).subscribe(() => {
    // second parameter - this.cart - is the data we are sending to the server
    // saving data to the server
    // console.log(`product ${product.name} added to cart.`);
    // });
    // subscribe to the post method
  }

  remove(product: IProduct) {
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('removed ' + product.name + ' from cart!');
    });
  }
}
