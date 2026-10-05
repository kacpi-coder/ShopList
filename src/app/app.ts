import { Component, signal } from '@angular/core';
import { ProductList } from './product-list/product-list';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-root',
  imports: [ProductList, Cart],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projekt-sklep');

  products = [
    { id: 1, name: 'Klawiatura', price: 199 },
    { id: 2, name: 'Mysz', price: 99 },
    { id: 3, name: 'Monitor', price: 899 },
    { id: 4, name: 'Słuchawki', price: 149 }
  ];

  cart: any[] = [];

  addToCart(product: any) {
    this.cart.push(product);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }
}
