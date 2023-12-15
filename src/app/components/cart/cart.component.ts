import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  totalCartItems: number = 0;
  totalAmount: string = "0.00";
  cart: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.totalCartItems$.subscribe((totalCartItems:number) => {
      this.totalCartItems = totalCartItems;
    });

    this.cartService.totalAmount$.subscribe((totalAmount: string) => {
      this.totalAmount = totalAmount;
    })

    this.cartService.cart$.subscribe((cart: CartItem[]) => {
      this.cart = cart;
    })
  }

  addToCart(id: number):void {
    this.cartService.addProduct(id, 1);
  }

  removeFromCart(id: number): void {
    this.cartService.removeProduct(id);
  }

  submitOrder():void {}
}
