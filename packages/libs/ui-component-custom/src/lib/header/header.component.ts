import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCategory } from '@packages/interfaces';

import { EventsService } from '../../../../../apps/frontend/src/app/services/events.service';
import { RouterLink, ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DatastoreService } from '../../../../../apps/frontend/src/app/services/datastore.service';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  categories = signal<EventCategory[]>([]);
  eventsService = inject(EventsService);

  city: string | null = '';

  isMenuOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStore: DatastoreService,
  ) {
    this.city = this.route.snapshot.paramMap.get('city');
  }

  ngOnInit(): void {
    this.getAllEventCategories();
  }

  getAllEventCategories() {
    this.eventsService.getAllEventCategories().subscribe((category) => {
      this.categories.set(category);
    });
  }

  goToCategory(category: string, name: string) {
    this.router.navigate([this.city, category]);
    this.dataStore.setCategory(name);
    this.toggleMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
