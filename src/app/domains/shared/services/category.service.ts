import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category } from '@shared/components/counter/models/category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<category[]>(`https://api.escuelajs.co/api/v1/categories`);
  }


}
