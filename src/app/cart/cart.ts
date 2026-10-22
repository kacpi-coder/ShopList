import { Component, Input, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnDestroy {
  @Input() mode: 'page' | 'modal' = 'page';

  cart: any[] = [];
  private subscription: Subscription;

  constructor(private cartService: CartService) {
    this.subscription = this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
  }

  removeProduct(index: number) {
    this.cartService.removeProduct(index);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}