import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { PlaceCategory } from '@packages/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor() { }

  http = inject(HttpClient);

  getAllEventCategories() {
    return this.http.get<PlaceCategory[]>(`${environment.apiBaseUrl}/place/categories`)
  }

}
