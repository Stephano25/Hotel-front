// src/app/pages/about-us/about-us.component.ts (si vous avez un tel composant)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsService } from '../../services/about-us.service';
import { AboutUs } from '../../interfaces/about-us.interface';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutUsData: AboutUs | null = null;

  constructor(private aboutUsService: AboutUsService) { }

  ngOnInit(): void {
    this.aboutUsService.getAboutUsData().subscribe({
      next: (data) => {
        this.aboutUsData = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données de la page "À propos"', err);
      }
    });
  }
}