import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  cart: any[] = [];

  constructor() {
    this.loadCart();
  }

  loadCart() {
    this.cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
  }

  increaseQuantity(index: number) {

    this.cart[index].quantity += 1;

    this.saveCart();
  }

  decreaseQuantity(index: number) {

    if (this.cart[index].quantity > 1) {

      this.cart[index].quantity -= 1;

    } else {

      this.cart.splice(index, 1);

    }

    this.saveCart();
  }

  removeProduct(index: number) {

    this.cart.splice(index, 1);

    this.saveCart();
  }

  saveCart() {

    localStorage.setItem(
      'cart',
      JSON.stringify(this.cart)
    );

  }

  getTotal(): number {

    return this.cart.reduce(
      (sum, product) =>
        sum + product.price * product.quantity,
      0
    );

  }
}
