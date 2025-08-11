// src/app/pages/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('LoginComponent ngOnInit: checking if user is logged in.');
    if (this.authService.isLoggedIn()) {
      console.log('User is already logged in. Attempting to fetch role and redirect.');
      this.authService.fetchUserRole().then(() => {
        this.authService.role$.pipe(
          filter(role => {
            console.log('ngOnInit - Role from service (filter):', role);
            return !!role; // Attendre que le rôle soit une chaîne non vide
          }),
          take(1)
        ).subscribe(role => {
          console.log('ngOnInit - Redirecting based on role:', role);
          this.redirectToBasedOnRole(role);
        });
      }).catch(err => {
        console.error("ngOnInit - Erreur lors de la récupération du rôle au démarrage:", err);
        // Si fetchUserRole échoue, cela signifie probablement que le token est invalide,
        // et logout() aura déjà été appelé par le service.
      });
    } else {
      console.log('User is not logged in.');
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  async handleLogin(): Promise<void> {
    this.error = '';
    console.log('handleLogin: Attempting to log in with email:', this.email);
    try {
      await this.authService.login(this.email, this.password);
      console.log('handleLogin: Login successful in AuthService. Now subscribing to role$.');

      this.authService.role$.pipe(
        filter(role => {
          console.log('handleLogin - Role from service (filter):', role);
          return !!role; // Attendre que le rôle soit une chaîne non vide
        }),
        take(1)
      ).subscribe(role => {
        console.log('handleLogin - Redirecting based on role:', role);
        this.redirectToBasedOnRole(role);
      });

    } catch (err: any) {
      console.error("handleLogin - Erreur de connexion:", err);
      this.error = err.message || 'Email ou mot de passe incorrect.';
    }
  }

  /**
   * Méthode utilitaire pour rediriger l'utilisateur en fonction de son rôle.
   * @param role Le rôle de l'utilisateur ('admin' ou autre).
   */
  private redirectToBasedOnRole(role: string): void {
    if (role === 'admin') {
      this.router.navigate(['/dashboard']);
      console.log('Redirection vers /dashboard');
    } else {
      this.router.navigate(['/home']);
      console.log('Redirection vers /home');
    }
  }
}
