// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// Importez la fonction d'intercepteur si elle est standalone, ou la classe si elle est traditionnelle
// Si AuthInterceptor est une classe traditionnelle (comme c'est le cas dans votre code actuel),
// vous devez l'utiliser avec provideHttpClient() et non withInterceptors().
// Si vous voulez utiliser withInterceptors, AuthInterceptor doit être une fonction.
// Pour l'instant, nous allons adapter main.ts pour utiliser la classe AuthInterceptor.
import { AuthInterceptor } from './app/services/auth.interceptor'; // Assurez-vous que le chemin est correct
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Importez HTTP_INTERCEPTORS
import { importProvidersFrom } from '@angular/core'; // Pour importer des modules si nécessaire

bootstrapApplication(AppComponent, {
  providers: [
    // Fournit le système de routage à l'application
    provideRouter(routes),
    // Fournit le module HttpClient et enregistre l'intercepteur de manière traditionnelle
    // car AuthInterceptor est une classe et non une fonction d'intercepteur standalone.
    provideHttpClient(), // Fournit HttpClient sans intercepteurs ici
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // Si vous avez d'autres services ou modules à fournir globalement, ajoutez-les ici
    // Par exemple, si vous utilisez FormsModule ou ReactiveFormsModule globalement:
    // importProvidersFrom(FormsModule),
    // importProvidersFrom(ReactiveFormsModule)
  ]
}).catch(err => console.error(err));

