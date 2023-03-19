import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalState {
  opened: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modalState$ = new BehaviorSubject({ opened: false });

  get modalState$() {
    return this._modalState$.asObservable();
  }

  closeModal() {
    this._modalState$.next({
      ...this._modalState$.value,
      opened: false,
    });
  }

  openModal() {
    console.log(this);
    this._modalState$.next({
      opened: true,
    });
  }
}
