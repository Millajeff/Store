import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../components/counter/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(category_id?: string){
    const url = new URL(`https://api.escuelajs.co/api/v1/products`);
    if (category_id){
      url.searchParams.set('categoryId', category_id)
    }
    return this.http.get<product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}
