import { Component, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import InnerImageZoom from 'inner-image-zoom';
import 'inner-image-zoom/lib/styles.min.css';

@Component({
  selector: 'app-product-info',
  imports: [RouterLink],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss'
})
export class ProductInfo implements AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private zoom: InnerImageZoom | InnerImageZoom[] | undefined;

  products = [
    { id: 1, name: 'Klawiatura', price: 199, image: '/klawiatura.webp', description: 'Wygodna klawiatura do codziennej pracy i grania.' },
    { id: 2, name: 'Mysz', price: 99, image: '/myszka.jpg', description: 'Precyzyjna mysz komputerowa do pracy i gier.' },
    { id: 3, name: 'Monitor', price: 899, image: '/monitor.jpg', description: 'Monitor zapewniający wyraźny obraz podczas pracy i rozrywki.' },
    { id: 4, name: 'Słuchawki', price: 149, image: '/sluchawki.webp', description: 'Słuchawki do muzyki, rozmów i grania.' },
    { id: 5, name: 'Fotel Gamingowy', price: 579, image: '/fotel.webp', description: 'Wygodny fotel do długich sesji przy komputerze.' },
    { id: 6, name: 'Stojak na pada i słuchawki', price: 215, image: '/stoajk.jpg', description: 'Praktyczny stojak pomagający utrzymać porządek na biurku.' }
  ];

  product = this.products.find(
    item => item.id === Number(this.route.snapshot.paramMap.get('id'))
  );

ngAfterViewInit() {
  if (document.querySelector('.product-image .iiz')) {
    this.zoom = new InnerImageZoom('.product-image .iiz', {
      zoomType: 'hover',
      zoomScale: 1.5
    });
  }
}

  ngOnDestroy() {
    if (Array.isArray(this.zoom)) {
      this.zoom.forEach(item => item.uninit());
    } else {
      this.zoom?.uninit();
    }
  }
}