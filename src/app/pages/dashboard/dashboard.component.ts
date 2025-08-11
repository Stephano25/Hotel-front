// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'; // Import Subscription for managing subscriptions
// Si vous utilisez HttpClient pour appeler votre API backend:
// import { HttpClient } from '@angular/common/http'; // Décommentez si vous configurez HttpClient

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Propriétés pour l'ajout d'un nouvel utilisateur (Admin)
  newAdminName: string = '';
  newAdminEmail: string = '';
  newAdminPassword: string = '';
  newAdminRole: string = 'admin';

  message: string = '';
  error: string = '';
  isAdmin: boolean = false;
  userId: string | null = null; // ID de l'utilisateur authentifié (simulé pour l'instant)

  // Nouvelle propriété pour gérer la vue active du tableau de bord
  currentView: 'overview' | 'rooms' | 'leisures' | 'menus' | 'games' | 'pools' | 'admins' |
               'addRoom' | 'addLeisure' | 'addMenu' | 'addGame' | 'addPool' | 'addAdmin' |
               'editRoom' | 'editLeisure' | 'editMenu' | 'editGame' | 'editPool' | 'editAdmin' = 'overview';

  // Propriétés pour les données des formulaires (exemples)
  roomName: string = '';
  roomPrice: number = 0;
  roomDescription: string = '';
  roomImageFile: File | null = null;

  leisureName: string = '';
  leisureDescription: string = '';
  leisureImageFile: File | null = null;

  menuName: string = '';
  menuPrice: number = 0;
  menuDescription: string = '';
  menuImageFile: File | null = null;

  gameName: string = '';
  gameDescription: string = '';
  gameImageFile: File | null = null;

  poolName: string = '';
  poolDescription: string = '';
  poolImageFile: File | null = null;

  // Propriétés pour les éléments en cours de modification
  editingRoom: any | null = null;
  editingLeisure: any | null = null;
  editingMenu: any | null = null;
  editingGame: any | null = null;
  editingPool: any | null = null;
  editingAdmin: any | null = null;


  // Données pour les listes (simulées localement, à remplacer par des appels API)
  rooms: any[] = [
    { id: 'room1', name: 'Chambre Standard', price: 100, description: 'Chambre confortable avec vue sur le jardin.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Chambre1', status: 'available' },
    { id: 'room2', name: 'Suite Deluxe', price: 250, description: 'Suite spacieuse avec balcon et vue sur la mer.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Chambre2', status: 'occupied' }
  ];
  leisures: any[] = [
    { id: 'leisure1', name: 'Spa & Bien-être', description: 'Massages, sauna et hammam.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Loisir1' },
    { id: 'leisure2', name: 'Excursion en Bateau', description: 'Visite des îles voisines.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Loisir2' }
  ];
  menus: any[] = [
    { id: 'menu1', name: 'Menu du Chef', price: 35, description: 'Plat signature avec dessert.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Menu1' },
    { id: 'menu2', name: 'Menu Végétarien', price: 28, description: 'Options saines et savoureuses.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Menu2' }
  ];
  games: any[] = [
    { id: 'game1', name: 'Billard', description: 'Table de billard professionnelle.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Jeu1' },
    { id: 'game2', name: 'Tennis de Table', description: 'Plusieurs tables disponibles.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Jeu2' }
  ];
  pools: any[] = [
    { id: 'pool1', name: 'Piscine Principale', description: 'Grande piscine extérieure avec transats.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Piscine1' },
    { id: 'pool2', name: 'Piscine Enfants', description: 'Piscine peu profonde pour les plus jeunes.', imageUrl: 'https://placehold.co/150x100/E0F2F7/2C5282?text=Piscine2' }
  ];
  admins: any[] = [
    { id: 'admin1', name: 'Jean Dupont', email: 'jean.dupont@hotel.com' },
    { id: 'admin2', name: 'Marie Curie', email: 'marie.curie@hotel.com' }
  ];

  // Métriques du tableau de bord (maintenant dérivées des données locales simulées)
  availableRoomsCount: number = 0;
  occupiedRoomsCount: number = 0;
  availableRestaurantTables: number = 15; // Simulé
  totalRevenue: number = 12500; // Simulé
  totalExpenses: number = 7500; // Simulé
  totalProfit: number = 0; // Calculé
  pageVisitors: number = 1500; // Simulé
  registeredUsers: number = 300; // Simulé
  loggedInUsers: number = 50; // Simulé
  adminCount: number = 0; // Basé sur les données locales des admins

  // Subscription pour gérer le rôle de l'utilisateur (si nécessaire)
  private authSubscription: Subscription | undefined;

  // Décommentez le constructeur si vous utilisez HttpClient
  // constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Simuler un ID utilisateur pour la démo si nécessaire
    this.userId = 'simulated-user-id';

    this.authSubscription = this.authService.role$.subscribe(role => {
      this.isAdmin = (role === 'admin');
      if (!this.isAdmin && this.router.url.includes('/dashboard')) {
        this.router.navigate(['/home']);
      }
    });

    // Dans une vraie application, vous feriez un appel API pour charger les données initiales ici.
    // Exemple: this.loadDataFromBackend();
    this.updateDashboardMetrics(); // Initialiser les métriques basées sur les données simulées
    this.showOverview();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // Méthode pour charger les données depuis le backend (conceptual)
  // async loadDataFromBackend(): Promise<void> {
  //   try {
  //     // Exemple d'appel pour récupérer les chambres
  //     // this.rooms = await this.http.get<any[]>('/api/rooms').toPromise();
  //     // Exemple d'appel pour récupérer les administrateurs
  //     // this.admins = await this.http.get<any[]>('/api/admins').toPromise();
  //     // Mettre à jour les métriques après le chargement des données
  //     this.updateDashboardMetrics();
  //   } catch (e) {
  //     this.error = 'Erreur lors du chargement des données depuis le backend.';
  //     console.error(e);
  //   }
  // }

  // Méthode pour mettre à jour les métriques du tableau de bord
  private updateDashboardMetrics(): void {
    this.availableRoomsCount = this.rooms.filter(room => room.status === 'available').length;
    this.occupiedRoomsCount = this.rooms.filter(room => room.status === 'occupied').length;
    this.adminCount = this.admins.length;
    this.totalProfit = this.totalRevenue - this.totalExpenses;
  }

  // Méthode pour gérer la déconnexion
  async handleLogout(): Promise<void> {
    await this.authService.logout();
  }

  // Méthode pour naviguer vers la page d'accueil
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  // Méthodes pour changer la vue principale du tableau de bord
  showOverview(): void {
    this.resetViewStates();
    this.currentView = 'overview';
    this.updateDashboardMetrics(); // Mettre à jour les métriques lors de l'affichage de l'aperçu
  }

  showRooms(): void {
    this.resetViewStates();
    this.currentView = 'rooms';
  }

  showLeisures(): void {
    this.resetViewStates();
    this.currentView = 'leisures';
  }

  showMenus(): void {
    this.resetViewStates();
    this.currentView = 'menus';
  }

  showGames(): void {
    this.resetViewStates();
    this.currentView = 'games';
  }

  showPools(): void {
    this.resetViewStates();
    this.currentView = 'pools';
  }

  showAdmins(): void {
    this.resetViewStates();
    this.currentView = 'admins';
  }

  // Méthodes pour afficher les formulaires d'ajout spécifiques
  showAddRoomForm(): void {
    this.resetViewStates();
    this.currentView = 'addRoom';
  }

  showAddLeisureForm(): void {
    this.resetViewStates();
    this.currentView = 'addLeisure';
  }

  showAddMenuForm(): void {
    this.resetViewStates();
    this.currentView = 'addMenu';
  }

  showAddGameForm(): void {
    this.resetViewStates();
    this.currentView = 'addGame';
  }

  showAddPoolForm(): void {
    this.resetViewStates();
    this.currentView = 'addPool';
  }

  showAddAdminForm(): void {
    this.resetViewStates();
    this.currentView = 'addAdmin';
  }

  // Méthodes pour annuler les formulaires d'ajout
  cancelAddRoomForm(): void {
    this.roomName = ''; this.roomPrice = 0; this.roomDescription = ''; this.roomImageFile = null;
    this.showRooms(); // Retourne à la liste des chambres
  }

  cancelAddLeisureForm(): void {
    this.leisureName = ''; this.leisureDescription = ''; this.leisureImageFile = null;
    this.showLeisures(); // Retourne à la liste des loisirs
  }

  cancelAddMenuForm(): void {
    this.menuName = ''; this.menuPrice = 0; this.menuDescription = ''; this.menuImageFile = null;
    this.showMenus(); // Retourne à la liste des menus
  }

  cancelAddGameForm(): void {
    this.gameName = ''; this.gameDescription = ''; this.gameImageFile = null;
    this.showGames(); // Retourne à la liste des jeux
  }

  cancelAddPoolForm(): void {
    this.poolName = ''; this.poolDescription = ''; this.poolImageFile = null;
    this.showPools(); // Retourne à la liste des piscines
  }

  cancelAddAdminForm(): void {
    this.newAdminName = ''; this.newAdminEmail = ''; this.newAdminPassword = '';
    this.showAdmins(); // Retourne à la liste des administrateurs
  }

  // Méthodes pour afficher les formulaires de modification
  editItem(itemType: string, item: any): void {
    this.resetViewStates();
    this.message = '';
    this.error = '';

    switch (itemType) {
      case 'room':
        this.editingRoom = { ...item }; // Crée une copie pour l'édition
        this.currentView = 'editRoom';
        break;
      case 'leisure':
        this.editingLeisure = { ...item };
        this.currentView = 'editLeisure';
        break;
      case 'menu':
        this.editingMenu = { ...item };
        this.currentView = 'editMenu';
        break;
      case 'game':
        this.editingGame = { ...item };
        this.currentView = 'editGame';
        break;
      case 'pool':
        this.editingPool = { ...item };
        this.currentView = 'editPool';
        break;
      case 'admin':
        this.editingAdmin = { ...item };
        this.currentView = 'editAdmin';
        break;
      default:
        console.warn('Type d\'élément inconnu pour l\'édition:', itemType);
        this.showOverview();
    }
  }

  // Méthodes pour annuler les formulaires de modification
  cancelEditRoomForm(): void {
    this.editingRoom = null;
    this.showRooms();
  }
  cancelEditLeisureForm(): void {
    this.editingLeisure = null;
    this.showLeisures();
  }
  cancelEditMenuForm(): void {
    this.editingMenu = null;
    this.showMenus();
  }
  cancelEditGameForm(): void {
    this.editingGame = null;
    this.showGames();
  }
  cancelEditPoolForm(): void {
    this.editingPool = null;
    this.showPools();
  }
  cancelEditAdminForm(): void {
    this.editingAdmin = null;
    this.showAdmins();
  }

  // Réinitialise tous les états d'affichage des vues et les propriétés d'édition
  private resetViewStates(): void {
    this.currentView = 'overview'; // Définit une vue par défaut lors de la réinitialisation
    this.message = '';
    this.error = '';
    this.editingRoom = null;
    this.editingLeisure = null;
    this.editingMenu = null;
    this.editingGame = null;
    this.editingPool = null;
    this.editingAdmin = null;
  }

  // Gestionnaire de fichier pour les images
  onFileSelected(event: Event, itemType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Note: Pour une persistance réelle des images, vous devriez les uploader vers un service de stockage
      // et stocker l'URL de téléchargement dans MongoDB via votre API backend.
      // Ici, nous utilisons URL.createObjectURL pour un affichage temporaire dans le navigateur.
      switch (itemType) {
        case 'room': this.roomImageFile = file; break;
        case 'leisure': this.leisureImageFile = file; break;
        case 'menu': this.menuImageFile = file; break;
        case 'game': this.gameImageFile = file; break;
        case 'pool': this.poolImageFile = file; break;
      }
    }
  }

  // Méthodes de soumission des formulaires (logique simulée pour MongoDB)
  async submitAddRoomForm(): Promise<void> {
    this.message = '';
    this.error = '';
    // Simuler l'ajout à la liste locale
    const newRoom = {
      id: 'room' + (this.rooms.length + 1), // ID simulé, à remplacer par un ID de MongoDB
      name: this.roomName,
      price: this.roomPrice,
      description: this.roomDescription,
      imageUrl: this.roomImageFile ? URL.createObjectURL(this.roomImageFile) : 'https://placehold.co/150x100/E0F2F7/2C5282?text=Nouvelle+Chambre',
      status: 'available'
    };
    this.rooms.push(newRoom);
    this.message = 'Chambre ajoutée avec succès (simulé) !';
    this.roomName = ''; this.roomPrice = 0; this.roomDescription = ''; this.roomImageFile = null;
    this.updateDashboardMetrics(); // Mettre à jour les métriques
    this.showRooms();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    try {
      // Exemple: await this.http.post('/api/rooms', newRoom).toPromise();
      // L'API renverrait l'objet complet avec l'ID généré par MongoDB
      this.message = 'Chambre ajoutée avec succès !';
      this.showRooms();
    } catch (e) {
      this.error = 'Erreur lors de l\'ajout de la chambre via l\'API.';
      console.error(e);
    }
    */
  }

  async submitEditRoomForm(): Promise<void> {
    this.message = '';
    this.error = '';
    if (!this.editingRoom) {
      this.error = 'Aucune chambre sélectionnée pour la modification.';
      return;
    }
    // Simuler la modification dans la liste locale
    const index = this.rooms.findIndex(r => r.id === this.editingRoom.id);
    if (index !== -1) {
      this.rooms[index] = { ...this.editingRoom };
      if (this.roomImageFile) {
        this.rooms[index].imageUrl = URL.createObjectURL(this.roomImageFile);
        this.roomImageFile = null;
      }
      this.message = `Chambre "${this.editingRoom.name}" modifiée avec succès (simulé) !`;
    } else {
      this.error = 'Chambre non trouvée pour la modification.';
    }
    this.editingRoom = null;
    this.updateDashboardMetrics(); // Mettre à jour les métriques
    this.showRooms();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    try {
      // Exemple: await this.http.put(`/api/rooms/${this.editingRoom.id}`, this.editingRoom).toPromise();
      this.message = 'Chambre modifiée avec succès !';
      this.showRooms();
    } catch (e) {
      this.error = 'Erreur lors de la modification de la chambre via l\'API.';
      console.error(e);
    }
    */
  }

  async submitAddLeisureForm(): Promise<void> {
    this.message = '';
    this.error = '';
    const newLeisure = {
      id: 'leisure' + (this.leisures.length + 1),
      name: this.leisureName,
      description: this.leisureDescription,
      imageUrl: this.leisureImageFile ? URL.createObjectURL(this.leisureImageFile) : 'https://placehold.co/150x100/E0F2F7/2C5282?text=Nouveau+Loisir'
    };
    this.leisures.push(newLeisure);
    this.message = 'Loisir ajouté avec succès (simulé) !';
    this.leisureName = ''; this.leisureDescription = ''; this.leisureImageFile = null;
    this.showLeisures();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    // try { await this.http.post('/api/leisures', newLeisure).toPromise(); this.message = 'Loisir ajouté avec succès !'; this.showLeisures(); }
    // catch (e) { this.error = 'Erreur lors de l\'ajout du loisir via l\'API.'; console.error(e); }
    */
  }

  async submitEditLeisureForm(): Promise<void> {
    this.message = '';
    this.error = '';
    if (!this.editingLeisure) { this.error = 'Aucun loisir sélectionné pour la modification.'; return; }
    const index = this.leisures.findIndex(l => l.id === this.editingLeisure.id);
    if (index !== -1) {
      this.leisures[index] = { ...this.editingLeisure };
      if (this.leisureImageFile) {
        this.leisures[index].imageUrl = URL.createObjectURL(this.leisureImageFile);
        this.leisureImageFile = null;
      }
      this.message = `Loisir "${this.editingLeisure.name}" modifié avec succès (simulé) !`;
    } else { this.error = 'Loisir non trouvé pour la modification.'; }
    this.editingLeisure = null;
    this.showLeisures();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    // try { await this.http.put(`/api/leisures/${this.editingLeisure.id}`, this.editingLeisure).toPromise(); this.message = 'Loisir modifié avec succès !'; this.showLeisures(); }
    // catch (e) { this.error = 'Erreur lors de la modification du loisir via l\'API.'; console.error(e); }
    */
  }

  async submitAddMenuForm(): Promise<void> {
    this.message = '';
    this.error = '';
    const newMenu = {
      id: 'menu' + (this.menus.length + 1),
      name: this.menuName,
      price: this.menuPrice,
      description: this.menuDescription,
      imageUrl: this.menuImageFile ? URL.createObjectURL(this.menuImageFile) : 'https://placehold.co/150x100/E0F2F7/2C5282?text=Nouveau+Menu'
    };
    this.menus.push(newMenu);
    this.message = 'Menu ajouté avec succès (simulé) !';
    this.menuName = ''; this.menuPrice = 0; this.menuDescription = ''; this.menuImageFile = null;
    this.showMenus();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    // try { await this.http.post('/api/menus', newMenu).toPromise(); this.message = 'Menu ajouté avec succès !'; this.showMenus(); }
    // catch (e) { this.error = 'Erreur lors de l\'ajout du menu via l\'API.'; console.error(e); }
    */
  }

  async submitEditMenuForm(): Promise<void> {
    this.message = '';
    this.error = '';
    if (!this.editingMenu) { this.error = 'Aucun menu sélectionné pour la modification.'; return; }
    const index = this.menus.findIndex(m => m.id === this.editingMenu.id);
    if (index !== -1) {
      this.menus[index] = { ...this.editingMenu };
      if (this.menuImageFile) {
        this.menus[index].imageUrl = URL.createObjectURL(this.menuImageFile);
        this.menuImageFile = null;
      }
      this.message = `Menu "${this.editingMenu.name}" modifié avec succès (simulé) !`;
    } else { this.error = 'Menu non trouvé pour la modification.'; }
    this.editingMenu = null;
    this.showMenus();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    // try { await this.http.put(`/api/menus/${this.editingMenu.id}`, this.editingMenu).toPromise(); this.message = 'Menu modifié avec succès !'; this.showMenus(); }
    // catch (e) { this.error = 'Erreur lors de la modification du menu via l\'API.'; console.error(e); }
    */
  }

  async submitAddGameForm(): Promise<void> {
    this.message = '';
    this.error = '';
    const newGame = {
      id: 'game' + (this.games.length + 1),
      name: this.gameName,
      description: this.gameDescription,
      imageUrl: this.gameImageFile ? URL.createObjectURL(this.gameImageFile) : 'https://placehold.co/150x100/E0F2F7/2C5282?text=Nouveau+Jeu'
    };
    this.games.push(newGame);
    this.message = 'Jeu ajouté avec succès (simulé) !';
    this.gameName = ''; this.gameDescription = ''; this.gameImageFile = null;
    this.showGames();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    // try { await this.http.post('/api/games', newGame).toPromise(); this.message = 'Jeu ajouté avec succès !'; this.showGames(); }
    // catch (e) { this.error = 'Erreur lors de l\'ajout du jeu via l\'API.'; console.error(e); }
    */
  }

  async submitEditGameForm(): Promise<void> {
    this.message = '';
    this.error = '';
    if (!this.editingGame) { this.error = 'Aucun jeu sélectionné pour la modification.'; return; }
    const index = this.games.findIndex(g => g.id === this.editingGame.id);
    if (index !== -1) {
      this.games[index] = { ...this.editingGame };
      if (this.gameImageFile) {
        this.games[index].imageUrl = URL.createObjectURL(this.gameImageFile);
        this.gameImageFile = null;
      }
      this.message = `Jeu "${this.editingGame.name}" modifié avec succès (simulé) !`;
    } else { this.error = 'Jeu non trouvé pour la modification.'; }
    this.editingGame = null;
    this.showGames();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    // try { await this.http.put(`/api/games/${this.editingGame.id}`, this.editingGame).toPromise(); this.message = 'Jeu modifié avec succès !'; this.showGames(); }
    // catch (e) { this.error = 'Erreur lors de la modification du jeu via l\'API.'; console.error(e); }
    */
  }

  async submitAddPoolForm(): Promise<void> {
    this.message = '';
    this.error = '';
    const newPool = {
      id: 'pool' + (this.pools.length + 1),
      name: this.poolName,
      description: this.poolDescription,
      imageUrl: this.poolImageFile ? URL.createObjectURL(this.poolImageFile) : 'https://placehold.co/150x100/E0F2F7/2C5282?text=Nouvelle+Piscine'
    };
    this.pools.push(newPool);
    this.message = 'Piscine ajoutée avec succès (simulé) !';
    this.poolName = ''; this.poolDescription = ''; this.poolImageFile = null;
    this.showPools();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    // try { await this.http.post('/api/pools', newPool).toPromise(); this.message = 'Piscine ajoutée avec succès !'; this.showPools(); }
    // catch (e) { this.error = 'Erreur lors de l\'ajout de la piscine via l\'API.'; console.error(e); }
    */
  }

  async submitEditPoolForm(): Promise<void> {
    this.message = '';
    this.error = '';
    if (!this.editingPool) { this.error = 'Aucune piscine sélectionnée pour la modification.'; return; }
    const index = this.pools.findIndex(p => p.id === this.editingPool.id);
    if (index !== -1) {
      this.pools[index] = { ...this.editingPool };
      if (this.poolImageFile) {
        this.pools[index].imageUrl = URL.createObjectURL(this.poolImageFile);
        this.poolImageFile = null;
      }
      this.message = `Piscine "${this.editingPool.name}" modifiée avec succès (simulé) !`;
    } else { this.error = 'Piscine non trouvée pour la modification.'; }
    this.editingPool = null;
    this.showPools();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    // try { await this.http.put(`/api/pools/${this.editingPool.id}`, this.editingPool).toPromise(); this.message = 'Piscine modifiée avec succès !'; this.showPools(); }
    // catch (e) { this.error = 'Erreur lors de la modification de la piscine via l\'API.'; console.error(e); }
    */
  }

  async submitAddAdminForm(): Promise<void> {
    this.message = '';
    this.error = '';
    // Simuler l'ajout d'un admin localement
    const newAdmin = {
      id: 'admin' + (this.admins.length + 1), // ID simulé, à remplacer par un ID de MongoDB
      name: this.newAdminName,
      email: this.newAdminEmail,
      role: this.newAdminRole
    };
    this.admins.push(newAdmin);
    this.message = `Admin ${this.newAdminEmail} enregistré avec succès (simulé) !`;
    this.newAdminName = '';
    this.newAdminEmail = '';
    this.newAdminPassword = '';
    this.updateDashboardMetrics(); // Mettre à jour les métriques
    this.showAdmins();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici pour créer l'utilisateur
    // et potentiellement ajouter ses informations à une collection 'admins' ou 'users' dans MongoDB:
    // try {
    //   await this.authService.registerUserByAdmin(this.newAdminName, this.newAdminEmail, this.newAdminPassword, this.newAdminRole);
    //   // Puis, si nécessaire, un appel à votre API pour stocker les détails de l'admin dans MongoDB
    //   // await this.http.post('/api/admins', { name: this.newAdminName, email: this.newAdminEmail, role: this.newAdminRole }).toPromise();
    //   this.message = `Admin ${this.newAdminEmail} enregistré avec succès !`;
    //   this.showAdmins();
    // } catch (e) {
    //   this.error = 'Erreur lors de l\'enregistrement de l\'administrateur via l\'API.';
    //   console.error(e);
    // }
    */
  }

  async submitEditAdminForm(): Promise<void> {
    this.message = '';
    this.error = '';
    if (!this.editingAdmin) { this.error = 'Aucun administrateur sélectionné pour la modification.'; return; }
    const index = this.admins.findIndex(a => a.id === this.editingAdmin.id);
    if (index !== -1) {
      this.admins[index] = { ...this.editingAdmin };
      this.message = `Administrateur "${this.editingAdmin.name}" modifié avec succès (simulé) !`;
    } else { this.error = 'Administrateur non trouvé pour la modification.'; }
    this.editingAdmin = null;
    this.updateDashboardMetrics(); // Mettre à jour les métriques
    this.showAdmins();
    /*
    // Dans une vraie application, vous feriez un appel à votre API backend ici:
    // try {
    //   await this.http.put(`/api/admins/${this.editingAdmin.id}`, this.editingAdmin).toPromise();
    //   this.message = 'Administrateur modifié avec succès !';
    //   this.showAdmins();
    // } catch (e) {
    //   this.error = 'Erreur lors de la modification de l\'administrateur via l\'API.';
    //   console.error(e);
    // }
    */
  }

  // Méthodes de gestion des actions (Supprimer) - Logique simulée
  deleteItem(itemType: string, itemId: string): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer cet élément de type ${itemType} avec l'ID ${itemId} ?`)) {
      this.message = '';
      this.error = '';
      switch (itemType) {
        case 'room':
          this.rooms = this.rooms.filter(item => item.id !== itemId);
          this.updateDashboardMetrics(); // Mettre à jour les métriques
          break;
        case 'leisure': this.leisures = this.leisures.filter(item => item.id !== itemId); break;
        case 'menu': this.menus = this.menus.filter(item => item.id !== itemId); break;
        case 'game': this.games = this.games.filter(item => item.id !== itemId); break;
        case 'pool': this.pools = this.pools.filter(item => item.id !== itemId); break;
        case 'admin':
          this.admins = this.admins.filter(item => item.id !== itemId);
          this.updateDashboardMetrics(); // Mettre à jour les métriques
          break;
      }
      this.message = `${itemType} supprimé avec succès (simulé) !`;
      /*
      // Dans une vraie application, vous feriez un appel à votre API backend ici:
      // try {
      //   await this.http.delete(`/api/${itemType}s/${itemId}`).toPromise();
      //   this.message = `${itemType} supprimé avec succès !`;
      // } catch (e) {
      //   this.error = `Erreur lors de la suppression de ${itemType} via l\'API.`;
      //   console.error(e);
      // }
      */
    }
  }
}
