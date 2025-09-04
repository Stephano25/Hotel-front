// src/app/hotel-sports-leisure/hotel-sports-leisure.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../interfaces/activity.interface';

@Component({
  selector: 'app-hotel-sports-leisure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-sports-leisure.component.html',
  styleUrls: ['./hotel-sports-leisure.component.css']
})
export class HotelSportsLeisureComponent implements OnInit {
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des activités', err);
      }
    });
  }
}