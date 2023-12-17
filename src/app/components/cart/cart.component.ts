import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Customer } from '../../models/customer';
import { Payment } from '../../models/payment';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  totalCartItems: number = 0;
  totalAmount: string = "0.00";
  cart: CartItem[] = [];

  customer: Customer = {
    firstname: '',
    lastname: '',
    address: ''
  }

  payment: Payment = {
    name: '',
    ccn: '',
    exp: '',
    ccv: ''
  }

  orderForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    address: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    ccn: new FormControl(null, [Validators.required, Validators.minLength(16), Validators.pattern(/\d{16}/)]),
    exp: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(/\d{2}\/\d{2}/)]),
    ccv: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/\d{3}/)])
  });

  constructor(private cartService: CartService, private router: Router) {}

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

  onSubmit():void {
    if(this.orderForm.invalid || this.totalCartItems === 0) return;

    this.cartService.setCustomerDetails(this.customer);
    this.router.navigate(['/confirmation']);
  }

  get controls(): { [p: string]: AbstractControl } {
    return this.orderForm.controls;
  }
}
