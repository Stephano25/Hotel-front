// src/app/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  dashboardData: any;
  isLoading = true;
  error: string | null = null; // Correction: ajoutez le type 'string'

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardData().subscribe({
      next: (data: any) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Impossible de récupérer les données du tableau de bord.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}