import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  totalCartItems: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.totalCartItems$.subscribe((totalCartItems:number) => {
      this.totalCartItems = totalCartItems;
    });
  }

}
