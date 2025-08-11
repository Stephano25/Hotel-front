// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// Définissez une interface pour votre utilisateur
interface User {
  id: string;
  email: string;
  role: string; // Assurez-vous que ce champ est toujours présent
  name?: string; // Ajouté car le backend peut le renvoyer et le signup l'utilise
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject pour l'utilisateur connecté
  private _user = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this._user.asObservable();

  // BehaviorSubject pour l'état de chargement
  private _isLoading = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this._isLoading.asObservable();

  // BehaviorSubject pour le rôle de l'utilisateur
  private _role = new BehaviorSubject<string>('');
  role$: Observable<string> = this._role.asObservable();

  // URL de base de votre API backend
  private apiUrl = 'http://localhost:5000/api'; // L'URL de votre backend sans le '/auth' final

  constructor(private http: HttpClient, private router: Router) {
    console.log('AuthService constructor: Loading user from local storage...');
    this.loadUserFromLocalStorage();
  }

  /**
   * Récupère le token JWT depuis le stockage local.
   * @returns Le token ou null si non trouvé.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Vérifie si un utilisateur est actuellement connecté (présence du token).
   * @returns Vrai si un token est présent, faux sinon.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Récupère le rôle et les informations de l'utilisateur depuis le backend.
   * Cette méthode est cruciale pour la redirection et la gestion des permissions.
   */
  async fetchUserRole(): Promise<void> {
    this._isLoading.next(true); // Début du chargement
    console.log('AuthService: fetchUserRole called.');
    try {
      const token = this.getToken();
      if (!token) {
        console.log('AuthService: No token found, logging out in fetchUserRole.');
        this.logout();
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      // Spécifiez le type de réponse attendu pour une meilleure typisation
      const response = await this.http.get<User>(`${this.apiUrl}/auth/me`, { headers }).toPromise();

      if (response && response.id && response.email && response.role) {
        console.log('AuthService: User data and role fetched successfully:', response);
        this._user.next({ id: response.id, email: response.email, role: response.role, name: response.name });
        this._role.next(response.role);
      } else {
        console.warn('AuthService: Invalid response from /me endpoint. Logging out.', response);
        this.logout(); // Réponse invalide, déconnexion
      }
    } catch (error: any) {
      console.error('AuthService: Erreur lors de la récupération du rôle de l\'utilisateur:', error);
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.error('AuthService: Token non valide ou expiré. Déconnexion.');
      } else if (error instanceof HttpErrorResponse && error.status === 404) {
        console.error('AuthService: Endpoint /api/auth/me non trouvé sur le backend. Vérifiez votre implémentation backend.');
      }
      this.logout(); // Si erreur (token invalide, expiré, ou autre), déconnexion
    } finally {
      this._isLoading.next(false); // Fin du chargement
      console.log('AuthService: fetchUserRole finished. isLoading:', this._isLoading.value);
    }
  }

  /**
   * Enregistre un nouvel utilisateur avec le rôle 'client'.
   * @param name Le nom de l'utilisateur.
   * @param email L'email de l'utilisateur.
   * @param password Le mot de passe de l'utilisateur.
   * @returns Une promesse qui se résout si l'inscription est réussie, rejette sinon.
   */
  async registerClient(name: string, email: string, password: string): Promise<void> {
    this._isLoading.next(true); // Début du chargement
    console.log('AuthService: registerClient called for email:', email);
    try {
      // Endpoint corrigé: /api/auth/signup
      await this.http.post<any>(`${this.apiUrl}/auth/signup`, { name, email, password, role: 'client' }).toPromise();
      console.log('AuthService: Client registered successfully.');
    } catch (error: any) {
      console.error('AuthService: Erreur lors de l\'inscription du client:', error);
      if (error instanceof HttpErrorResponse && error.error && error.error.message) {
        throw new Error(error.error.message);
      }
      throw new Error('Échec de l\'inscription. Veuillez réessayer.');
    } finally {
      this._isLoading.next(false); // Fin du chargement
      console.log('AuthService: registerClient finished. isLoading:', this._isLoading.value);
    }
  }

  /**
   * Charge l'utilisateur depuis le stockage local (token) et tente de récupérer son rôle.
   * Cette méthode est appelée au démarrage du service.
   */
  private async loadUserFromLocalStorage(): Promise<void> {
    this._isLoading.next(true); // Début du chargement
    console.log('AuthService: loadUserFromLocalStorage called.');
    try {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('AuthService: Token found in localStorage. Calling fetchUserRole.');
        await this.fetchUserRole();
      } else {
        console.log('AuthService: No token found in localStorage.');
        this._user.next(null);
        this._role.next('');
      }
    } catch (error) {
      console.error('AuthService: Erreur lors du chargement de l\'utilisateur depuis le stockage local:', error);
      this.logout(); // En cas d'erreur de chargement, déconnecter
    } finally {
      this._isLoading.next(false); // Fin du chargement
      console.log('AuthService: loadUserFromLocalStorage finished. isLoading:', this._isLoading.value);
    }
  }

  /**
   * Gère la connexion de l'utilisateur.
   * @param email L'email de l'utilisateur.
   * @param password Le mot de passe de l'utilisateur.
   * @returns Une promesse qui se résout si la connexion est réussie, rejette sinon.
   */
  async login(email: string, password: string): Promise<void> {
    this._isLoading.next(true); // Début du chargement
    console.log('AuthService: login called for email:', email);
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).toPromise();
      if (response && response.token) {
        console.log('AuthService: Login successful. Token received. Saving token and fetching user role.');
        localStorage.setItem('token', response.token);
        await this.fetchUserRole(); // Après la connexion, récupérez le rôle et les infos utilisateur
      } else {
        console.error('AuthService: Invalid login response. No token received.');
        throw new Error('Réponse de connexion invalide');
      }
    } catch (error: any) {
      console.error('AuthService: Erreur de connexion:', error);
      if (error instanceof HttpErrorResponse && error.error && error.error.message) {
        throw new Error(error.error.message);
      }
      throw new Error('Échec de la connexion. Email ou mot de passe incorrect.');
    } finally {
      this._isLoading.next(false); // Fin du chargement
      console.log('AuthService: login finished. isLoading:', this._isLoading.value);
    }
  }

  /**
   * Déconnecte l'utilisateur et le redirige vers la page de connexion.
   */
  async logout(): Promise<void> {
    console.log('AuthService: logout called. Clearing token and user data.');
    localStorage.removeItem('token');
    this._user.next(null);
    this._role.next('');
    this.router.navigate(['/login']); // Redirection vers la page de connexion
  }

  /**
   * Enregistre un utilisateur via l'interface administrateur.
   * @param name Le nom de l'utilisateur.
   * @param email L'email de l'utilisateur.
   * @param password Le mot de passe de l'utilisateur.
   * @param role Le rôle de l'utilisateur (ex: 'admin', 'client').
   * @returns Une promesse qui se résout si l'enregistrement est réussi, rejette sinon.
   */
  async registerUserByAdmin(name: string, email: string, password: string, role: string): Promise<void> {
    this._isLoading.next(true); // Début du chargement
    console.log('AuthService: registerUserByAdmin called for email:', email, 'with role:', role);
    try {
      const token = this.getToken();
      if (!token) {
        console.error('AuthService: registerUserByAdmin - No token found, unauthorized.');
        throw new Error('Non autorisé: Token manquant.');
      }

      const headers = { Authorization: `Bearer ${token}` };
      // Endpoint corrigé: /api/auth/admin/register
      await this.http.post<any>(`${this.apiUrl}/auth/admin/register`, { name, email, password, role }, { headers }).toPromise();
      console.log('AuthService: User registered by admin successfully.');
    } catch (error: any) {
      console.error('AuthService: Erreur lors de l\'enregistrement par l\'admin:', error);
      if (error instanceof HttpErrorResponse && error.error && error.error.message) {
        throw new Error(error.error.message);
      }
      throw new Error('Échec de l\'enregistrement de l\'utilisateur.');
    } finally {
      this._isLoading.next(false); // Fin du chargement
      console.log('AuthService: registerUserByAdmin finished. isLoading:', this._isLoading.value);
    }
  }
}
