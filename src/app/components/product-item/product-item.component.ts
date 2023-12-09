import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  selectedQuantity: number = 1;

  @Input() product: Product = {
    id: 1,
    name: '',
    description: '',
    url: '',
    price: 0
  };

  constructor(private cartService: CartService) {}

  addToCart(productId: number): void {
    this.cartService.addProduct(productId, this.selectedQuantity);
    this.selectedQuantity = 1;
  }

}
