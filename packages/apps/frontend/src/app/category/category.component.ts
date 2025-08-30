import { Component, OnChanges, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@packages/ui-component-custom';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../services/events.service';
import { City, Event} from '../interfaces/events.interface';
import { DatastoreService } from '../../../../../apps/frontend/src/app/services/datastore.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TrimPipe } from '../../../../../apps/frontend/src/app/pipes/trim.pipe';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/ru';
import { CapitalizeFirstPipe } from '../pipes/capitalize-first.pipe';
import { faRouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {DateAdapter, provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDateAdapter } from './dataadapter';


export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();
  customPaginatorIntl.itemsPerPageLabel = 'Количество на страницу:';
  return customPaginatorIntl;
}

export type filterItem = {
  id: number; 
  name: string;
  isChosen: boolean;
  func: () => void;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatCardModule, MatButtonModule, TrimPipe, MatPaginatorModule, MatProgressSpinnerModule, RouterLink, CapitalizeFirstPipe, FontAwesomeModule, MatDatepickerModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
   providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    provideNativeDateAdapter(),
     { provide: DateAdapter, useClass: CustomDateAdapter }
  ]
})

export class CategoryComponent implements OnInit {
  faRouble = faRouble;

  eventsService = inject(EventsService);
  events = signal<Event[]>([]);
  dataStore = inject(DatastoreService);
  route = inject(ActivatedRoute);

  cities: City[] = [];
  currentCuty = "";

  countEvents = 0;
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = 5;
  page = 0;

  isLoading = true;
  isChosen = false;

  currentMonth: number;
  nextMonth: number;

  currentMonthString: string;
  nextMonthString:  string;
  category: string | null = '';
  city = '';
  categoryName = '';

  list: filterItem[];
  actualSince = moment().unix();
  actualUntil = moment('21000101').unix();

  dateRangeStart: null | Date = null;
  dateRangeEnd: null | Date = null;


  constructor() {
    const now = new Date();
    const momentDate = moment(now);
    this.currentMonth = momentDate.month() + 1; 
    this.nextMonth = momentDate.month() + 2;

    this.currentMonthString = moment().locale('ru').format('MMMM');
    this.nextMonthString = momentDate.clone().add(1, 'month').format('MMMM'); 
     
    this.list = [
      { id: 1, name: 'Сегодня', isChosen: false, func: this.clickTodayMonthHandler.bind(this)},
      { id: 2, name: this.currentMonthString, isChosen: false, func: this.clickCurrentMonthHandler.bind(this)},
      { id: 3, name: this.nextMonthString, isChosen: false, func: this.clickNextMonthHandler.bind(this)}
    ];
  }

  ngOnInit(): void {
    //const city = this.route.snapshot.paramMap.get('city');  
    //const category = this.route.snapshot.paramMap.get('category');  
    // if (city && category) {
    //   this.getAllEventsByCategories(city, category);
    // }
 

    this.route.params.subscribe(
      params => {
          this.city = params['city'];
          this.categoryName = params['category'];
          this.category = this.dataStore.getCategory();
          this.getAllEventsByCategories(this.city, this.categoryName, this.page + 1, this.pageSize, this.actualSince, this.actualUntil);
          this.getCities();
      });

    
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   for (const propName in changes) {
  //     const chng = changes[propName];
  //     const cur  = JSON.stringify(chng.currentValue);
  //     const prev = JSON.stringify(chng.previousValue);
  //     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  //   }
  // } // ???


  getAllEventsByCategories(city: string, category: string, page: number, pageSize: number, actualSince: number, actualUntil: number) {
    this.isLoading = true;
    this.eventsService.getAllEventsByCategories(city, category, page, pageSize, actualSince, actualUntil).subscribe((events) => {
      this.events.set(events.results);
      this.countEvents = events.count;
      this.isLoading = false;
    });
  }

  getCity() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].slug === this.city) {
        this.currentCuty = this.cities[i].name;
        console.log(this.currentCuty)
      }
    }
  }


  getCities() {
    this.eventsService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.getCity();
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;

    this.getAllEventsByCategories(this.city, this.categoryName, this.page, event.pageSize, this.actualSince, this.actualUntil);
  }

  clickTodayMonthHandler() {
    const currentDate = moment().unix();
    this.actualSince = currentDate;
    this.actualUntil = currentDate;
    this.page = 0;

    this.getAllEventsByCategories(this.city, this.categoryName, this.page + 1, this.pageSize, this.actualSince, this.actualUntil );
  }

  clickCurrentMonthHandler() {
    this.actualSince = moment().startOf('month').unix();
    this.actualUntil = moment().endOf('month').unix();
    this.page = 0;

    this.getAllEventsByCategories(this.city, this.categoryName, this.page + 1, this.pageSize, this.actualSince, this.actualUntil);
  }

  clickNextMonthHandler() {
    this.actualSince = moment().add(1, 'M').startOf('month').unix();
    this.actualUntil = moment().add(1, 'M').endOf('month').unix();
    this.page = 0;

    this.getAllEventsByCategories(this.city, this.categoryName, this.page + 1, this.pageSize, this.actualSince, this.actualUntil);
  }

  chosenItem(item: filterItem): void {
    for (const currentObject of this.list) {
      currentObject.isChosen = false;
    }
    item.isChosen = !item.isChosen;
  }


  onDateChangeStart(event: MatDatepickerInputEvent<Date>): void {
    this.dateRangeStart = event.value;
  }

  onDateChangeEnd(event: MatDatepickerInputEvent<Date>): void {
    this.dateRangeEnd = event.value;

    this.actualSince = moment(this.dateRangeStart).unix();
    this.actualUntil = moment(this.dateRangeEnd).unix();

    if (this.actualSince && this.actualUntil) {
      this.getAllEventsByCategories(this.city, this.categoryName, this.page + 1, this.pageSize, this.actualSince, this.actualUntil);
    }

  }
  
}
