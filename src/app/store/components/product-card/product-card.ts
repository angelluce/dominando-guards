import {Component, inject, model} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {NgIcon} from '@ng-icons/core';
import {CartService} from '../../services/cart';
import {ToastService} from '@shared/services/toast';
import {ProductInterface} from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  imports: [
    CurrencyPipe,
    NgIcon
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  protected readonly cartService = inject(CartService);
  readonly product = model.required<ProductInterface>();
  private toastService = inject(ToastService);

  addToCart(product: ProductInterface) {
    this.cartService.addItem(product);
    this.toastService.success('Agregado al carrito');
  }

}
