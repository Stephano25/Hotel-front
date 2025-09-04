// src/app/pages/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, le rediriger au chargement de la page
    this.authService.role$.subscribe((role) => {
      if (role) {
        this.redirectToBasedOnRole(role);
      }
    });
  }

  async handleLogin() {
    this.loading = true;
    try {
      await this.authService.login(this.email, this.password);
      // La redirection se fera automatiquement via la souscription dans ngOnInit
      this.error = null;
    } catch (err: any) {
      console.error('Login failed', err);
      this.error = err.error?.message || 'Email ou mot de passe invalide.';
    } finally {
      this.loading = false;
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  private redirectToBasedOnRole(role: string): void {
    if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}