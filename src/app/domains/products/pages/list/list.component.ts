import { Component, signal, inject, Input, SimpleChanges } from '@angular/core';

import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { product } from '@shared/components/counter/models/product.models';
import { CartService } from '@shared/services/cart.service'
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { category } from '@shared/components/counter/models/category.models';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],

})
export default class ListComponent {
  products = signal<product[]>([]);
  categories = signal<category[]>([]);

  private CartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() category_id?: string;

  ngOnInit(): void {
    this.getCategories();
  }
  ngOnChanges(changes: SimpleChanges){
    this.getProducts();
  }

  addToCart(product: product) {
    this.CartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id)
      .subscribe({
        next: (products) => {
          //  Nos aseguramos de que products sea un array de productos (product[])
          if (Array.isArray(products)) {
            this.products.set(products);
          } else {
            console.error('El servicio no devolvió un array de productos:', products);
          }
        },
        error: (error) => {
          console.error('Error al obtener productos:', error);
        },
      });
  }

  private getCategories() {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.categories.set(data);
        },
        error: (error) => {
          console.error('Error al obtener las categorias:', error);
        },
      });
  }
}

