// src/app/pages/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html', // Assurez-vous que ceci pointe vers votre fichier HTML d'inscription
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, le rediriger pour éviter qu'il ne voie la page d'inscription.
    // La logique de redirection basée sur le rôle est gérée dans le LoginComponent après connexion,
    // ou via un AuthGuard pour les routes protégées. Ici, une simple redirection vers /home est suffisante.
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  /**
   * Redirige l'utilisateur vers la page de connexion.
   */
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Gère la soumission du formulaire d'inscription.
   * Appelle le service d'authentification pour enregistrer un nouvel utilisateur.
   */
  async handleRegister(): Promise<void> {
    this.error = ''; // Réinitialise le message d'erreur
    this.message = ''; // Réinitialise le message de succès

    try {
      // Appelle la méthode registerClient du service d'authentification
      await this.authService.registerClient(this.name, this.email, this.password);

      // Affiche un message de succès et réinitialise les champs du formulaire
      this.message = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
      this.name = '';
      this.email = '';
      this.password = '';

      // Redirige l'utilisateur vers la page de connexion après un court délai
      // pour lui permettre de voir le message de succès.
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // Redirige après 2 secondes
    } catch (err: any) {
      // Gère les erreurs lors de l'inscription et affiche un message à l'utilisateur
      console.error("Erreur lors de l'inscription:", err);
      this.error = err.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';
    }
  }
}
