import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startDate',
})
export class StartDatePipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): unknown {
    return `${value.getHours()}:${value.getMinutes()}`;
  }
}
