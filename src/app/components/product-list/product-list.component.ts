import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService) {
    this.products = [];
  }

  ngOnInit() {
    this.productService.getProductsData().subscribe(products => {
      this.products = products;
    });
  }
}
