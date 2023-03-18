import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(seconds: number, ...args: unknown[]): unknown {
    const minutes = Math.floor(seconds / 60);
    const secondsremainder = seconds % 60;
    return `${minutes} min ${secondsremainder} sec`;
  }
}
