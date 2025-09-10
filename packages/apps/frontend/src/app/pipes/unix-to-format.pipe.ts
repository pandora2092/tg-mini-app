import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';

@Pipe({
  name: 'unixToFormat',
  standalone: true,
})
export class DataPipe implements PipeTransform {
  transform(html: number, ...args: unknown[]): string {
    console.log(html);
    return moment.unix(html).locale('ru').format('D MMMM Y H:mm');
  }
}
