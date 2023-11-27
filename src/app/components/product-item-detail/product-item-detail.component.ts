import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css'
})
export class ProductItemDetailComponent {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    url: '',
    price: 0
  };

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      const productId: number = parseInt(id);
      if (productId && productId !== 0) {
        this.productService.getProductData(productId as unknown as number).subscribe(product => {
          if (product) {
            this.product = product;
          }
        });
      }
    }
  }
}
