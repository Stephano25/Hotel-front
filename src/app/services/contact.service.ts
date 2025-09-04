// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact.interface'; // Assurez-vous d'avoir cette interface

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5000/api/contact';

  constructor(private http: HttpClient) { }

  sendContactForm(contactData: Omit<Contact, '_id'>): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contactData);
  }
}