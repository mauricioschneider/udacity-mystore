import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, find, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  getProductsData(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/data.json')
  }

  getProductData(id: number): Observable<Product | undefined> {
    console.log(id);
    const product = this.getProductsData().pipe(map(products => products.find(product => product.id == id)));
    return product;
  }
}