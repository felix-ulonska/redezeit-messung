import { Pipe, PipeTransform } from '@angular/core';
import { RedezeitSpeaker } from '../models/redezeit-type';
import { RedezeitType } from '../_enums/redezeit-type.enum';

@Pipe({
  name: 'typeRedezeit',
})
export class TypeRedezeitPipe implements PipeTransform {
  transform(value: RedezeitType, ...args: unknown[]): string {
    switch (value) {
      case RedezeitType.Beitrag:
        return 'Beitrag';
      case RedezeitType.Bericht:
        return 'Bericht';
    }
  }
}
