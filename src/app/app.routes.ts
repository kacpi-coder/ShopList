import { Routes } from '@angular/router';

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
      import('./product-list/product-list').then(m => m.ProductList)
  },
  {
  path: 'produkt/:id',
  loadComponent: () =>
    import('./product-detail/product-detail')
      .then(m => m.ProductDetail)
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
