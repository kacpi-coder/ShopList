import { Component, output, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductItem } from '../product-item/product-item';
import { CartService } from '../cart-service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-product-list',
  imports: [ProductItem, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail {
  private readonly cartService = inject(CartService);

  products = [
    { id: 1, name: 'Klawiatura', price: 199, reviewsCount: 17, image: '/klawiatura.webp', rating: 3 },
    { id: 2, name: 'Mysz', price: 99, reviewsCount: 48, image: '/myszka.jpg', rating: 4 },
    { id: 3, name: 'Monitor', price: 899, reviewsCount: 35, image: '/monitor.jpg', rating: 5 },
    { id: 4, name: 'Słuchawki', price: 149, reviewsCount: 247, image: '/sluchawki.webp', rating: 4 },
    { id: 5, name: 'Fotel Gamingowy', price: 579, reviewsCount: 452, image: '/fotel.webp', rating: 5 },
    { id: 6, name: 'Stojak na pada i słuchawki', price: 215, reviewsCount: 1046, image: '/stoajk.jpg', rating: 4 }
  ];

  addToCart = output<any>();
  addedProductId: number | null = null;

  onAddToCart(product: any) {
    this.cartService.addProduct(product);
    this.addToCart.emit(product);
    this.addedProductId = product.id;

    setTimeout(() => {
      if (this.addedProductId === product.id) {
        this.addedProductId = null;
      }
    }, 1600);
  }
}