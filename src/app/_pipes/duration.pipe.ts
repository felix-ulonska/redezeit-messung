import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(seconds: number, ...args: unknown[]): unknown {
    const minutes = Math.floor(seconds / 60);
    const secondsremainder = seconds % 60;
    if (minutes > 0) {
      return `${minutes}:${secondsremainder} min`;
    } else {
      return `${secondsremainder} sec`;
    }
  }
}
