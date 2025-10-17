import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product';
import {ProductInterface} from '../../interfaces/product';
import {ProductCard} from '../../components/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [
    ProductCard
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  private readonly productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private allProducts = this.productService.getAllProducts();
  public currentCategory = signal<string>('Todos');
  public categories = this.productService.getAllCategories();
  public productsFilterable = computed<ProductInterface[]>(() => {
    const category = this.currentCategory();

    if (category === 'Todos') {
      return this.allProducts;
    }

    return this.allProducts.filter(p => p.category === category);
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const initialCategory = params.get('category');

      if (initialCategory) {
        const isValid = this.categories.some(cat => cat.toLowerCase() === initialCategory.toLowerCase());

        if (isValid) {
          setTimeout(() => {
            this.currentCategory.set(initialCategory);
          }, 1);
        } else {
          console.warn(`Categoría "${initialCategory}" no válida. Mostrando todo.`);
          this.currentCategory.set('Todos');
        }
      }
    });
  }

  setCategory(category: string): void {
    this.currentCategory.set(category);
  }

  handleCategoryChange(event: Event): void {
    if (!event.target) {
      return;
    }

    const selectElement = event.target as HTMLSelectElement;

    const newCategory = selectElement.value;

    this.setCategory(newCategory);
  }
}
