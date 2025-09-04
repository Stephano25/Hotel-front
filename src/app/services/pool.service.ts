// src/app/services/pool.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pool } from '../interfaces/pool.interface'; // Assurez-vous d'avoir cette interface

@Injectable({
  providedIn: 'root'
})
export class PoolService {
  private apiUrl = 'http://localhost:5000/api/pool';

  constructor(private http: HttpClient) { }

  getPoolData(): Observable<Pool> {
    return this.http.get<Pool>(this.apiUrl);
  }
}