import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim',
  standalone: true,
})
export class TrimPipe implements PipeTransform {
  transform(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }
}
