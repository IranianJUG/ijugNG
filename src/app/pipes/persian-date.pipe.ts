import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';

@Pipe({
  name: 'persianDate',
  standalone: true,
})
export class PersianDatePipe implements PipeTransform {
  transform(value: string, format: string = 'jYYYY/jMM/jDD HH:mm'): string {
    return moment(value, 'YYYY-MM-DD HH:mm:ss').locale('fa').format(format);
  }
}
