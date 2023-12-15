import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { ProductService } from './product.service';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];
  totalCartItemsSubject = new BehaviorSubject<number>(0);

  totalCartItems$ = this.totalCartItemsSubject.asObservable();

  constructor(private productService: ProductService, private toastrService: ToastrService) { }

  addProduct(id: number, quantity: number) {
    this.productService.getProductData(id).subscribe(product => {
      if (product) {
        const existingProductIndex = this.cart.findIndex(p => p.product.id === id);

        if (existingProductIndex !== -1) {
          this.cart[existingProductIndex].quantity += +quantity; 
        } else {
          this.cart.push({product: product, quantity: quantity});
        }

        this.toastrService.success(`${product.name} added to cart`, 'Cart Updated');

        const currentQuantity = this.totalCartItemsSubject.getValue();
        this.totalCartItemsSubject.next(currentQuantity + +quantity);
      }
    });
  }

  removeProduct(id: number) {
    const productIndex = this.cart.findIndex(p => p.product.id === id);
  
    if (productIndex !== -1) {
      const productName = this.cart[productIndex].product.name;

      if (this.cart[productIndex].quantity > 1) {
        this.cart[productIndex].quantity
      } else {
        this.cart.splice(productIndex, 1);
        this.toastrService.info(`${productName} removed from cart`, 'Cart Updated');
      }
  
      const currentQuantity = this.totalCartItemsSubject.getValue();
      this.totalCartItemsSubject.next(currentQuantity - this.cart[productIndex].quantity);

    }
  }
  
}
