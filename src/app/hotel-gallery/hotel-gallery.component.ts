// src/app/hotel-gallery/hotel-gallery.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../services/gallery.service';
import { Gallery } from '../interfaces/gallery.interface';

@Component({
  selector: 'app-hotel-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-gallery.component.html',
  styleUrls: ['./hotel-gallery.component.css']
})
export class HotelGalleryComponent implements OnInit {
  galleryImages: Gallery[] = [];

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.galleryService.getGalleryImages().subscribe({
      next: (data) => {
        this.galleryImages = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des images de la galerie', err);
      }
    });
  }
}