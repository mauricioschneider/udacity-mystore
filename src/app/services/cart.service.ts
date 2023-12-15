import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { ProductService } from './product.service';
import { Product } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  private totalCartItemsSubject = new BehaviorSubject<number>(0);
  private totalAmountSubject = new BehaviorSubject<string>("0.00");

  public totalCartItems$ = this.totalCartItemsSubject.asObservable();
  public totalAmount$ = this.totalAmountSubject.asObservable();

  constructor(private productService: ProductService, private toastrService: ToastrService) { }

  addProduct(id: number, quantity: number) {
    const cart = this.cartSubject.getValue();
    this.productService.getProductData(id).subscribe(product => {
      if (product) {
        const existingProductIndex = cart.findIndex(p => p.product.id === id);

        if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity += +quantity; 
        } else {
          cart.push({product: product, quantity: quantity});
        }

        this.toastrService.success(`${product.name} added to cart`, 'Cart Updated');

        const currentQuantity = this.totalCartItemsSubject.getValue();
        this.totalCartItemsSubject.next(currentQuantity + +quantity);

        this.totalAmountSubject.next(this.getTotalAmount());

        this.cartSubject.next(cart);
      }
    });
  }

  removeProduct(id: number) {
    const cart = this.cartSubject.getValue();
    const productIndex = cart.findIndex(p => p.product.id === id);
  
    if (productIndex !== -1) {
      const productName = cart[productIndex].product.name;

      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity--;
      } else {
        cart.splice(productIndex, 1);
        this.toastrService.warning(`${productName} removed from cart`, 'Cart Updated');
      }
  
      const currentQuantity = this.totalCartItemsSubject.getValue();
      this.totalCartItemsSubject.next(currentQuantity - 1);
      this.cartSubject.next(cart);
      this.totalAmountSubject.next(this.getTotalAmount());
    }
  }

  getTotalAmount():string {
    let total: number = 0;

    for (const item of this.cartSubject.getValue()) {
      total += item.product.price * item.quantity;
    }

    return total.toFixed(2);
  }

}
