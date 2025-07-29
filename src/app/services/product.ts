import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string;
  name: string;
  price: number;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private API_URL = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL, {
      headers: this.getAuthHeaders()
    });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product, {
      headers: this.getAuthHeaders()
    });
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
