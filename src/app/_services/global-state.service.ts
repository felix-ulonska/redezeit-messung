import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Redezeit } from '../models/redezeit';
import { RedezeitType } from '../models/redezeit-type';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  public state$ = new BehaviorSubject<RedezeitType>(RedezeitType.PAUSE);
  public redezeiten = new BehaviorSubject<Redezeit[]>([]);
}
