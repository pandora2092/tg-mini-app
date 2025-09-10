import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../services/events.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '@packages/ui-component-custom';
import { Event } from '@packages/interfaces';


@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
})
export class CityComponent implements OnInit {

  eventsService = inject(EventsService);
  events = signal<Event[]>([]);

  private counter = 5;
  
  private route = inject(ActivatedRoute);
  city: string | null;

  constructor() {
    this.city = this.route.snapshot.paramMap.get('city');  
    if (this.city) {
      this.getAllEventsByCity(this.city);
    }
  }

  ngOnInit(): void {
  }

  getAllEventsByCity(city: string) {
    this.eventsService.getAllEventsByCity(city).subscribe((events) => {
      this.events.set(events.results);
    });
  }

}
