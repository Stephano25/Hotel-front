import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];

  // Ajout de description à l'objet produit
  product: Product = { name: '', price: 0, description: '' };
  editIndex: number = -1;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: () => alert("❌ Échec du chargement des produits")
    });
  }

  onSubmit() {
    if (this.editIndex === -1) {
      // Créer un nouveau produit
      this.productService.createProduct(this.product).subscribe({
        next: (newProduct) => {
          this.products.push(newProduct);
          this.resetForm();
        },
        error: () => alert("❌ Échec de l’ajout du produit")
      });
    } else {
      const productToUpdate = this.products[this.editIndex];
      this.productService.updateProduct(productToUpdate._id!, this.product).subscribe({
        next: (updatedProduct) => {
          this.products[this.editIndex] = updatedProduct;
          this.resetForm();
        },
        error: () => alert("❌ Échec de la mise à jour")
      });
    }
  }

  editProduct(index: number) {
    this.product = { ...this.products[index] };
    this.editIndex = index;
  }

  deleteProduct(index: number) {
    const id = this.products[index]._id!;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products.splice(index, 1);
        if (this.editIndex === index) this.resetForm();
      },
      error: () => alert("❌ Échec de la suppression")
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.editIndex = -1;
    this.product = { name: '', price: 0, description: '' };
  }
}
