import { Injectable } from '@angular/core';
import { BehaviorSubject, EmptyError, firstValueFrom } from 'rxjs';
import { Redezeit } from '../models/redezeit';
import { RedezeitSpeaker } from '../models/redezeit-type';
import { RedezeitType } from '../_enums/redezeit-type.enum';
import { RedezeitState } from '../models/redezeit-state';
import { Top } from '../models/top';

export interface Modifier {
  type: RedezeitType;
}

const EMPTY_STATE = () => {
  return { redezeiten: [], tops: [] };
};

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  public state$ = new BehaviorSubject<RedezeitSpeaker>(RedezeitSpeaker.PAUSE);
  public redezeiten = new BehaviorSubject<RedezeitState>(
    JSON.parse(
      localStorage.getItem('contentv3') ??
        JSON.stringify(EMPTY_STATE()) ??
        EMPTY_STATE(),
    ),
  );
  public modifier$ = new BehaviorSubject<Modifier>({
    type: RedezeitType.Beitrag,
  });

  constructor() {
    this.redezeiten.subscribe((redezeiten) => {
      localStorage.setItem('contentv3', JSON.stringify(redezeiten));
    });
  }

  removeRedezeit(id: string) {
    const state = this.redezeiten.getValue();
    this.redezeiten.next({
      ...state,
      redezeiten: state.redezeiten.filter((redezeit) => redezeit.id !== id),
    });
  }

  addTop(newTop: Top) {
    const state = this.redezeiten.getValue();
    this.redezeiten.next({
      ...state,
      tops: [...state.tops, newTop],
    });
  }

  removeTop(id: string) {
    const state = this.redezeiten.getValue();
    this.redezeiten.next({
      ...state,
      tops: state.tops.filter((top) => top.id !== id),
    });
    console.log(this.redezeiten.getValue());
  }

  exportJSON() {
    const content = JSON.stringify(this.redezeiten.getValue());
    const link = document.createElement('a');
    const file = new Blob([content], { type: 'text/json' });
    link.href = URL.createObjectURL(file);
    const date = new Date();
    const dateString = date.toISOString().split('T')[0]; // This will format the date as "YYYY-MM-DD"
    const finalString = `Redezeitmessung-${dateString}.json`;
    link.download = finalString;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
