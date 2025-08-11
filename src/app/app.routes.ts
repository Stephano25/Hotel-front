// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Nécessaire si vos formulaires utilisent FormsModule

// Importez vos composants
import { HotelHomeComponent } from './hotel-home/hotel-home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'; // Importez le nouveau composant Dashboard
import { HotelRoomsComponent } from './hotel-rooms/hotel-rooms.component';
import { HotelRestaurantComponent } from './hotel-restaurant/hotel-restaurant.component';
import { HotelPoolComponent } from './hotel-pool/hotel-pool.component';
import { HotelSportsLeisureComponent } from './hotel-sports-leisure/hotel-sports-leisure.component';


export const routes: Routes = [
  // Route par défaut : redirige la racine ('') vers la page d'accueil ('/home').
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' // Assure que le chemin entier correspond
  },

  // Route pour la page d'accueil de l'hôtel.
  {
    path: 'home',
    loadComponent: () => import('./hotel-home/hotel-home.component').then(m => m.HotelHomeComponent),
  },

  // Route pour la page de connexion.
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    providers: [importProvidersFrom(FormsModule)] // Fournit FormsModule spécifiquement pour cette route
  },

  // Route pour la page d'inscription.
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    providers: [importProvidersFrom(FormsModule)] // Fournit FormsModule spécifiquement pour cette route
  },

  // NOUVELLE ROUTE POUR LE DASHBOARD ADMIN
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    providers: [importProvidersFrom(FormsModule)] // Le dashboard utilise aussi des formulaires
  },

  // Nouvelle route pour la page des chambres de l'hôtel.
  {
    path: 'rooms',
    loadComponent: () => import('./hotel-rooms/hotel-rooms.component').then(m => m.HotelRoomsComponent),
  },

  // Nouvelle route pour la page du restaurant de l'hôtel.
  {
    path: 'restaurant',
    loadComponent: () => import('./hotel-restaurant/hotel-restaurant.component').then(m => m.HotelRestaurantComponent),
  },

  // Nouvelle route pour la page de la piscine.
  {
    path: 'pool',
    loadComponent: () => import('./hotel-pool/hotel-pool.component').then(m => m.HotelPoolComponent), // Assurez-vous que c'est bien HotelPoolComponent
  },

  // Nouvelle route pour la page des sports et loisirs.
  {
    path: 'sports-leisure',
    loadComponent: () => import('./hotel-sports-leisure/hotel-sports-leisure.component').then(m => m.HotelSportsLeisureComponent), // Assurez-vous que c'est bien HotelSportsLeisureComponent
  },

  // Route générique pour les chemins non trouvés (404).
  {
    path: '**',
    redirectTo: '/home'
  }
];
