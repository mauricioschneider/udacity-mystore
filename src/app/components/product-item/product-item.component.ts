import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  @Output() addToCartEvent = new EventEmitter<{productId: number, quantity: number}>();


  constructor() {}

  addToCart(): void {
    this.addToCartEvent.emit({productId: this.product.id, quantity: this.selectedQuantity});
    this.selectedQuantity = 1;
  }

}
