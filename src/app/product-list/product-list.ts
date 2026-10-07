import { Component, output } from '@angular/core';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {

  products = [
    { id: 1, name: 'Klawiatura', price: 199 },
    { id: 2, name: 'Mysz', price: 99 },
    { id: 3, name: 'Monitor', price: 899 },
    { id: 4, name: 'Słuchawki', price: 149 }
  ];

  addToCart = output<any>();

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

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

    this.addToCart.emit(product);
  }
}
