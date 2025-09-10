import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  private data = '';

  setCategory(city: string) {
    this.data = city;
  }

  getCategory(): string {
    return this.data;
  }
}
