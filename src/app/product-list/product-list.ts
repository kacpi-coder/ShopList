
import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {

  products = [
    {
      id: 1,
      name: 'Klawiatura',
      price: 199,
      reviewsCount: 17,
      image: '/klawiatura.webp',
      rating: 3
    },
    {
      id: 2,
      name: 'Mysz',
      price: 99,
      reviewsCount: 48,
      image: '/myszka.jpg',
      rating: 4
    },
    {
      id: 3,
      name: 'Monitor',
      price: 899,
      reviewsCount: 35,
      image: '/monitor.jpg',
      rating: 5
    },
    {
      id: 4,
      name: 'Słuchawki',
      price: 149,
      reviewsCount: 247,
      image: '/sluchawki.webp',
      rating: 4
    }
  ];

  addToCart = output<any>();

  addedProductId: number | null = null;

  onAddToCart(product: any) {
    const cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

    const existingProduct = cart.find(
      (item: any) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    this.addToCart.emit(product);

    this.addedProductId = product.id;

    setTimeout(() => {
      if (this.addedProductId === product.id) {
        this.addedProductId = null;
      }
    }, 1600);
  }
}
