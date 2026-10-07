import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-payment-form',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ReactiveFormsModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {

  constructor(private cartService: CartService) {}

    paymentForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      adres: new FormControl(''),
      paymentMethod: new FormControl('')
    });

    submitForm() {
    console.log(this.paymentForm.value, this.cartService.getTotal());

  }

}
