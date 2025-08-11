// src/app/app.component.ts
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hotel-app';
  isScrolled: boolean = false;
  showScrollToTop: boolean = false;
  userRole$: Observable<string | null>;
  currentRoute: string = ''; // Ajouté pour stocker la route actuelle

  constructor(
    public authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userRole$ = this.authService.role$;
  }

  ngOnInit(): void {
    // Écoute les événements de navigation pour mettre à jour la route actuelle
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });

    // Redirige vers le tableau de bord si l'utilisateur est admin après le chargement initial
    // et que la route actuelle n'est pas déjà le dashboard
    this.authService.role$.pipe(
      filter(role => role === 'admin'),
      filter(() => this.router.url !== '/dashboard') // Évite la redirection si déjà sur le dashboard
    ).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  // Méthode pour vérifier si la route actuelle est le tableau de bord
  isDashboardRoute(): boolean {
    return this.currentRoute.includes('/dashboard');
  }

  // Gère le défilement pour le header et le bouton "Retour en haut"
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 50;
      this.showScrollToTop = window.scrollY > 200;
    }
  }

  // Défilement vers le haut de la page
  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Méthode pour la déconnexion
  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']); // Redirige vers la page de connexion après déconnexion
  }

  // Détermine si les boutons flottants doivent être affichés
  shouldShowFixedButtons(): boolean {
    // Affiche les boutons flottants sur toutes les pages sauf le tableau de bord
    return !this.isDashboardRoute();
  }
}
