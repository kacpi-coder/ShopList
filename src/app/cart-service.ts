import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {

   cart: any[] = [];

constructor() {
  this.loadCart();
}

loadCart() {
  this.cart = JSON.parse(
    localStorage.getItem('cart') || '[]'
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
