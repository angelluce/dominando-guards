import {effect, inject, Injectable, signal} from '@angular/core';
import {StorageService} from '@shared/services/storage';
import {CartItemInterface} from '../interfaces/cart-item';
import {ProductInterface} from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'cart';
  private readonly storageService = inject(StorageService);
  private cartItemsSignal = signal<CartItemInterface[]>([]);
  public items = this.cartItemsSignal.asReadonly();

  constructor() {
    this.loadCartFromStorage();
    effect(() => {
      this.saveCartToStorage();
    });
  }

  private loadCartFromStorage(): void {
    const items: CartItemInterface[] = this.storageService.getItemJSON(this.STORAGE_KEY) ?? [];
    if (items) {
      try {
        this.cartItemsSignal.set(items);
      } catch (e) {
        console.error('Error al desencriptar o parsear el carrito:', e);
        this.storageService.removeItem(this.STORAGE_KEY);
      }
    }
  }

  private saveCartToStorage(): void {
    try {
      this.storageService.setItemJSON(this.STORAGE_KEY, this.cartItemsSignal());
    } catch (e) {
      console.error('Error al guardar el carrito en localStorage:', e);
    }
  }

  // ---------------- LÓGICA DE MUTACIÓN (Actualización de la Signal) ----------------

  /**
   * Añade un producto al carrito o incrementa su cantidad si ya existe.
   */
  addItem(product: ProductInterface, quantity?: number): void {
    this.cartItemsSignal.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        items.push({product, quantity: quantity ?? 1});
      }

      return [...items];
    });
  }
}
