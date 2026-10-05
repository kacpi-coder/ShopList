import { Component, input, output } from '@angular/core';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  products = input<any[]>([]);

  addToCart = output<any>();

  onAddToCart(product: any) {
    this.addToCart.emit(product);
  }
}
