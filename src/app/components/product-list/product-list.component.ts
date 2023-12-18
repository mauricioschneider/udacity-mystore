import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService, private cartService: CartService) {
    this.products = [];
  }

  ngOnInit() {
    this.productService.getProductsData().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(event: {productId: number, quantity: number}) {
    this.cartService.addProduct(event.productId, event.quantity);
  }
}
