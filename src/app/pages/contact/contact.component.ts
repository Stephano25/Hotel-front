// src/app/pages/contact/contact.component.ts
import { Component } from '@angular/core';
import { Contact } from '../../interfaces/contact.interface';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactData: Omit<Contact, '_id'> = {
    name: '',
    email: '',
    message: '',
    createdAt: new Date(),
  };

  constructor(private contactService: ContactService, private router: Router) { }

  onSubmit(): void {
    this.contactService.sendContactForm(this.contactData).subscribe({
      next: (response) => {
        console.log('Formulaire de contact envoyé avec succès', response);
        alert('Votre message a été envoyé !');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du formulaire', err);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    });
  }
}