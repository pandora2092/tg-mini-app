import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { NxWelcomeComponent } from './nx-welcome.component';
import { HeaderComponent } from '@packages/ui-component-custom';

@Component({
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
