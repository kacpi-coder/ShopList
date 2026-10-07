import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail {

  private route = inject(ActivatedRoute);

  productId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  products = [
    {
      id: 1,
      name: 'Klawiatura',
      price: 199,
      description: 'Wygodna klawiatura do codziennej pracy i grania.',
      image: '/klawiatura.webp',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Mysz',
      price: 99,
      description: 'Precyzyjna mysz komputerowa z ergonomicznym kształtem.',
      image: '/myszka.jpg',
      rating: 4
    },
    {
      id: 3,
      name: 'Monitor',
      price: 899,
      description: 'Nowoczesny monitor o wysokiej jakości obrazu.',
      image: '/monitor.jpg',
      rating: 5
    },
    {
      id: 4,
      name: 'Słuchawki',
      price: 149,
      description: 'Wygodne słuchawki zapewniające dobry dźwięk.',
      image: '/sluchawki.webp',
      rating: 4.5
    }
  ];

  product = this.products.find(
    product => product.id === this.productId
  );

  otherProducts = this.products.filter(
    product => product.id !== this.productId
  );

  addToCart() {

    if (!this.product) {
      return;
    }

    const cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

    const existingProduct = cart.find(
      (item: any) => item.id === this.product!.id
    );

    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      cart.push({
        ...this.product,
        quantity: 1
      });

    }

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );
  }
}
