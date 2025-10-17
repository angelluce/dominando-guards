import { Injectable } from '@angular/core';
import {ProductInterface} from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductInterface[] = [
    {
      id: 1,
      name: 'Octocat',
      description: 'La mascota de Github en varios estilos',
      category: 'Tecnología',
      image: 'https://images.pexels.com/photos/1181253/pexels-photo-1181253.jpeg',
      price: 12.00
    },
    {
      id: 2,
      name: 'Bitcoin',
      description: 'Paquete de stickers de Bitcoin y cripto',
      category: 'Tecnología',
      image: 'https://images.pexels.com/photos/8369836/pexels-photo-8369836.jpeg',
      price: 10.00
    },
    {
      id: 3,
      name: 'Aventuras de viaje',
      description: 'Ilustraciones vintage de viaje con un toque geek',
      category: 'Viajes',
      image: 'https://images.pexels.com/photos/25435665/pexels-photo-25435665.jpeg',
      price: 15.00
    },
    {
      id: 4,
      name: 'Viaje por carretera',
      description: 'Inspirados en la carretera y la aventura',
      category: 'Viajes',
      image: 'https://images.pexels.com/photos/6960384/pexels-photo-6960384.jpeg',
      price: 14.00
    },
  ];

  getAllProducts(): ProductInterface[] {
    return this.products;
  }

  getAllCategories(): string[] {
    const categories = new Set(this.products.map(p => p.category));
    return ['Todos', ...Array.from(categories)];
  }

}
