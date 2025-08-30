import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim',
  standalone: true,
})
export class TrimPipe implements PipeTransform {
  transform(html: string, ...args: unknown[]): string {
    return html.replace(/<[^>]*>/g, '');
  }
}
