// src/app/hotel-restaurant/hotel-restaurant.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../interfaces/restaurant.interface';

@Component({
  selector: 'app-hotel-restaurant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-restaurant.component.html',
  styleUrls: ['./hotel-restaurant.component.css']
})
export class HotelRestaurantComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurantData().subscribe({
      next: (data) => {
        this.restaurants = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données du restaurant', err);
      }
    });
  }
}