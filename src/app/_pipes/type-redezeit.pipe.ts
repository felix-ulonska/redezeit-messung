import { Pipe, PipeTransform } from '@angular/core';
import { RedezeitSpeaker } from '../models/redezeit-type';

@Pipe({
  name: 'typeRedezeit',
})
export class TypeRedezeitPipe implements PipeTransform {
  transform(value: RedezeitSpeaker, ...args: unknown[]): string {
    switch (value) {
      case RedezeitSpeaker.CISM:
        return 'Cis-M';
      case RedezeitSpeaker.FLINTA:
        return 'FLINTA*';
      case RedezeitSpeaker.PAUSE:
        return 'Pause';
    }
  }
}
