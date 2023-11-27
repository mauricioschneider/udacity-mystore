import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { ProductService } from './product.service';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];
  totalCartItemsSubject = new BehaviorSubject<number>(0);

  totalCartItems$ = this.totalCartItemsSubject.asObservable();

  constructor(private productService: ProductService) { }

  addProduct(id: number, quantity: number) {
    this.productService.getProductData(id).subscribe(product => {
      if (product) {
        const existingProductIndex = this.cart.findIndex(p => p.product.id === id);
        if (existingProductIndex !== -1) {
          this.cart[existingProductIndex].quantity += +quantity; 
        } else {
          this.cart.push({product: product, quantity: quantity});
        }
        const currentQuantity = this.totalCartItemsSubject.getValue();
        this.totalCartItemsSubject.next(currentQuantity + +quantity);
      }
    });
    console.log(this.cart);
  }
}
