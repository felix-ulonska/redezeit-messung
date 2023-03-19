import { Pipe, PipeTransform } from '@angular/core';
import { RedezeitType } from '../models/redezeit-type';

@Pipe({
  name: 'typeRedezeit',
})
export class TypeRedezeitPipe implements PipeTransform {
  transform(value: RedezeitType, ...args: unknown[]): string {
    switch (value) {
      case RedezeitType.CISM:
        return 'Cis-M';
      case RedezeitType.FLINTA:
        return 'FLINTA*';
      case RedezeitType.PAUSE:
        return 'Pause';
    }
  }
}
