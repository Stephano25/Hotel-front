// src/app/hotel-pool/hotel-pool.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolService } from '../services/pool.service';
import { Pool } from '../interfaces/pool.interface';

@Component({
  selector: 'app-hotel-pool',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-pool.component.html',
  styleUrls: ['./hotel-pool.component.css']
})
export class HotelPoolComponent implements OnInit {
  poolData: Pool | null = null;

  constructor(private poolService: PoolService) { }

  ngOnInit(): void {
    this.poolService.getPoolData().subscribe({
      next: (data) => {
        this.poolData = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données de la piscine', err);
      }
    });
  }
}