import { Routes } from '@angular/router';
import { ProductInfo } from './product-info/product-info';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./strona-glowna/strona-glowna').then(m => m.StronaGlowna)
  },
  {
    path: 'koszyk',
    loadComponent: () =>
      import('./cart/cart').then(m => m.Cart)
  },
   {
    path: 'lista-produktow',
    loadComponent: () =>
      import('./product-detail/product-detail').then(m => m.ProductDetail)
  },
  { 
    path: 'produkt/:id', component: ProductInfo 
  },
{
  path: 'payment-form',
  loadComponent: ()=> 
    import('./payment-form/payment-form').then(m=> m.PaymentForm)
},
  {
    path: '**',
    redirectTo: ''
  }
];
