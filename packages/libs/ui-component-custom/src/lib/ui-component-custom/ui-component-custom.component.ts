import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-component-custom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-component-custom.component.html',
  styleUrl: './ui-component-custom.component.css',
})
export class UiComponentCustomComponent {}
