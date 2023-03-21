import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  public redezeiten = new BehaviorSubject<Redezeit[]>([]);
  public modifier$ = new BehaviorSubject<Modifier>({
    type: RedezeitType.Beitrag,
  });
}
