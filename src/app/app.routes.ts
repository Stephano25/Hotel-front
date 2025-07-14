import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    providers: [importProvidersFrom(FormsModule)]
  }
];
