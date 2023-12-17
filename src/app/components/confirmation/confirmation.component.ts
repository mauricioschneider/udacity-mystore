import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Customer } from '../../models/customer';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  totalAmount: string = '';
  customer: Customer = {
    firstname: '',
    lastname: '',
    address: ''
  }

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.totalAmount$.subscribe((totalAmount: string) => {
      this.totalAmount = totalAmount;
    })

    this.customer = this.cartService.getCustomerDetails();

    if (this.totalAmount === '0.00') {
      console.log('redirecting to products');
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    this.cartService.reset();
  }

}
