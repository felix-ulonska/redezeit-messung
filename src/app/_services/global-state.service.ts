import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Redezeit } from '../models/redezeit';
import { RedezeitSpeaker } from '../models/redezeit-type';
import { RedezeitType } from '../_enums/redezeit-type.enum';

export interface Modifier {
  type: RedezeitType;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  public state$ = new BehaviorSubject<RedezeitSpeaker>(RedezeitSpeaker.PAUSE);
  public redezeiten = new BehaviorSubject<Redezeit[]>(
    JSON.parse(localStorage.getItem('content') ?? '[]') ?? []
  );
  public modifier$ = new BehaviorSubject<Modifier>({
    type: RedezeitType.Beitrag,
  });

  constructor() {
    this.redezeiten.subscribe((redezeiten) => {
      localStorage.setItem('content', JSON.stringify(redezeiten));
    });
  }

  removeRedezeit(id: string) {
    this.redezeiten.next(
      this.redezeiten.getValue().filter((redezeit) => redezeit.id !== id)
    );
  }

  exportCSV() {
    const content = this.redezeiten
      .getValue()
      .map((redezeit) =>
        [
          redezeit.id,
          redezeit.date,
          redezeit.duration,
          redezeit.type,
          redezeit.speaker,
        ].join(';')
      )
      .join('\n');
    const link = document.createElement('a');
    const file = new Blob([content], { type: 'text/csv' });
    link.href = URL.createObjectURL(file);
    link.download = 'epxport.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
