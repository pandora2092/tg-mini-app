import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

export type City = {
  slug: string;
  name: string;
  image: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule, RouterLink, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  cities = signal<City[]>([
    {
      slug: 'msk',
      name: 'Москва',
      image: '../assets/msk.jpg',
    },
    {
      slug: 'spb',
      name: 'Санкт-Петербург',
      image: '../assets/spb.jpg',
    },
    {
      slug: 'ekb',
      name: 'Екатеринбург',
      image: '../assets/ekb.jpg',
    },
    {
      slug: 'kzn',
      name: 'Казань',
      image: '../assets/kzn.jpeg',
    },
    {
      slug: 'nnv',
      name: 'Нижний Новгород',
      image: '../assets/nnv.jpg',
    },
  ]);

  ngOnInit(): void {}
}
