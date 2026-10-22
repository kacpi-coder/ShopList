import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>(
    JSON.parse(localStorage.getItem('cart') || '[]')
  );

  cart$ = this.cartSubject.asObservable();

  loadCart() {
    this.cartSubject.next(
      JSON.parse(localStorage.getItem('cart') || '[]')
    );
  }

  private save(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next([...cart]);
  }

  addProduct(product: any) {
    const cart = [...this.cartSubject.value];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.save(cart);
  }

  increaseQuantity(index: number) {
    const cart = [...this.cartSubject.value];
    if (!cart[index]) return;
    cart[index].quantity++;
    this.save(cart);
  }

  decreaseQuantity(index: number) {
    const cart = [...this.cartSubject.value];
    if (!cart[index]) return;

    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }

    this.save(cart);
  }

  removeProduct(index: number) {
    const cart = [...this.cartSubject.value];
    cart.splice(index, 1);
    this.save(cart);
  }

  getTotal(): number {
    return this.cartSubject.value.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }
}