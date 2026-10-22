
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-payment-form',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {
  orderSubmitted = false;
  orderData: any = null;
  total = 0;
  submitted = false;

  paymentForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    adres: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    paymentMethod: new FormControl('', [
      Validators.required
    ]),
    cardCode: new FormControl(''),
    blikCode: new FormControl('')
  });

  constructor(private cartService: CartService) {
    this.paymentForm.get('paymentMethod')!.valueChanges.subscribe(method => {
      const card = this.paymentForm.get('cardCode')!;
      const blik = this.paymentForm.get('blikCode')!;

      card.clearValidators();
      blik.clearValidators();
      card.setValue('');
      blik.setValue('');

      if (method === 'card') {
        card.setValidators([
          Validators.required,
          Validators.pattern(/^\d{16}$/)
        ]);
      }

      if (method === 'blik') {
        blik.setValidators([
          Validators.required,
          Validators.pattern(/^\d{6}$/)
        ]);
      }

      card.updateValueAndValidity();
      blik.updateValueAndValidity();
    });
  }

  get f() {
    return this.paymentForm.controls;
  }

  get PaymentMethod() {
    return this.paymentForm.get('paymentMethod')?.value;
  }

  submitForm() {
    this.submitted = true;
    this.paymentForm.markAllAsTouched();

    if (this.paymentForm.invalid) {
      return;
    }

    this.total = this.cartService.getTotal();

    this.orderData = {
      firstName: this.paymentForm.value.firstName,
      lastName: this.paymentForm.value.lastName,
      adres: this.paymentForm.value.adres,
      paymentMethod: this.paymentForm.value.paymentMethod
    };

    this.orderSubmitted = true;

    console.log('Zamówienie:', this.orderData);
    console.log('Suma:', this.total);
  }
}
