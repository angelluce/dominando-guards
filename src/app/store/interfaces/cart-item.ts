import {ProductInterface} from './product';

export interface CartItemInterface {
  product: ProductInterface;
  quantity: number;
}
