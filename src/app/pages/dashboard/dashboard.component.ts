import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products: Product[] = [];
  product: Product = { name: '', price: 0 };
  editIndex: number = -1;

  onSubmit() {
    if (this.editIndex === -1) {
      // Ajout produit
      this.products.push({ ...this.product });
    } else {
      // Modification produit
      this.products[this.editIndex] = { ...this.product };
      this.editIndex = -1;
    }
    this.product = { name: '', price: 0 };
  }

  editProduct(index: number) {
    this.product = { ...this.products[index] };
    this.editIndex = index;
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    if (this.editIndex === index) {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editIndex = -1;
    this.product = { name: '', price: 0 };
  }
}
