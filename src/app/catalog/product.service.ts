import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    //  query parameter: /api/products?sort=somesort&....
    return this.http.get<IProduct[]>('/api/products');
  }
}
