// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'; // <-- Importez HTTP_INTERCEPTORS
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor'; // <-- Importez votre intercepteur

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule),
    {
      provide: HTTP_INTERCEPTORS, // <-- Fournissez l'intercepteur
      useClass: AuthInterceptor,
      multi: true // <-- Permet d'avoir plusieurs intercepteurs
    }
  ]
};