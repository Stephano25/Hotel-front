// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard'; // ✅ Le chemin standard pour les guards

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./hotel-home/hotel-home.component').then(m => m.HotelHomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    providers: [importProvidersFrom(FormsModule)]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    providers: [importProvidersFrom(FormsModule)]
  },
  {
    path: 'rooms',
    loadComponent: () => import('./hotel-rooms/hotel-rooms.component').then(m => m.HotelRoomsComponent),
  },
  {
    path: 'restaurant',
    loadComponent: () => import('./hotel-restaurant/hotel-restaurant.component').then(m => m.HotelRestaurantComponent),
  },
  {
    path: 'pool',
    loadComponent: () => import('./hotel-pool/hotel-pool.component').then(m => m.HotelPoolComponent),
  },
  {
    path: 'sports-leisure',
    loadComponent: () => import('./hotel-sports-leisure/hotel-sports-leisure.component').then(m => m.HotelSportsLeisureComponent),
  },
  {
    path: 'booking',
    loadComponent: () => import('./booking/booking.component').then(m => m.BookingComponent),
    providers: [importProvidersFrom(FormsModule)]
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-room',
        loadComponent: () => import('./admin/add-room/add-room.component').then(m => m.AddRoomComponent),
        providers: [importProvidersFrom(FormsModule)]
      },
      {
        path: 'booking-list',
        loadComponent: () => import('./admin/booking-list/booking-list.component').then(m => m.BookingListComponent),
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];