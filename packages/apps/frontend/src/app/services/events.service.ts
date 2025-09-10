import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environment';
import { City, EventCategory, Events, Place } from '@packages/interfaces';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() {}

  http = inject(HttpClient);

  findOneEvent(id: number) {
    return this.http.get<Event>(`${environment.apiBaseUrl}/events/${id}`)
  }

  getAllEventsByCity(city: string) {
    return this.http.get<Events>(`${environment.apiBaseUrl}/events/${city}`)
  }

  getAllEventsByCategories(city: string, categories: string, page: number, pageSize: number, actualSince: number, actualUntil?: number) {
    return this.http.get<Events>(`${environment.apiBaseUrl}/events/${city}/${categories}/${page}/${pageSize}/${actualSince}/${actualUntil}`)
  }

  getAllEventCategories() {
    return this.http.get<EventCategory[]>(`${environment.apiBaseUrl}/events/categories`)
  }

  getCities() {
    return this.http.get<City[]>(`${environment.apiBaseUrl}/city`)
  }

  getInfoPlace(place_id: string) {
    return this.http.get<Place>(`${environment.apiBaseUrl}/places/${place_id}`)
  }

}
