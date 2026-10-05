import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [MatButtonModule,MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = input<any[]>([]);

  removeFromCart = output<number>();

  getTotal(): number {
   return this.cart().reduce((sum, product) => sum + product.price, 0);
  }

  removeProduct(index: number) {
    this.removeFromCart.emit(index);
  }
}
