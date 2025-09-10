import { AfterViewInit, Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../services/events.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '@packages/ui-component-custom';
import { Event, Place } from '@packages/interfaces';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Swiper from 'swiper';
import { Autoplay, Grid, Navigation, Pagination } from 'swiper/modules';
import { DataPipe } from '../pipes/unix-to-format.pipe';
import { faRouble, faLocationDot, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, DataPipe, FontAwesomeModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent implements OnInit, AfterViewInit {
  faRouble = faRouble;
  faLocationDot = faLocationDot;
  faCalendarDay = faCalendarDay;

  containerRef = viewChild.required<ElementRef>('containerEvent');
  private observer!: MutationObserver;

  swiperInstance!: Swiper;

  eventsService = inject(EventsService);
  private route = inject(ActivatedRoute);
  id = 0;

  event: Event | null = null;

  htmlString = '';
  sanitizedHtml: SafeHtml | null = null;

  info: Place | undefined = undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    this.observer = new MutationObserver(() => {
      const swiperContainerRef =
        this.containerRef().nativeElement.querySelectorAll('.swiper-container');

      if (swiperContainerRef) {
        for (let i = 0; i < swiperContainerRef.length; i++) {
          this.swiperInstance = new Swiper(swiperContainerRef[i], {
            modules: [Navigation, Pagination, Autoplay, Grid],
            speed: 400,
            //autoplay: true,
            spaceBetween: 100,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          });
        }
      }
    });

    this.observer.observe(this.containerRef().nativeElement, { childList: true, subtree: true });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.findOneEvent(this.id);
    });
  }

  findOneEvent(id: number) {
    this.eventsService.findOneEvent(id).subscribe((event) => {
      this.event = event as unknown as Event;
      console.log(this.event);
      this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.event.body_text);
      this.getInfoPlace();
    });
  }

  getInfoPlace() {
    if (this.event) {
      this.eventsService.getInfoPlace(this.event.place.id.toString()).subscribe((info) => {
        this.info = info;
      });
    }
  }
}
