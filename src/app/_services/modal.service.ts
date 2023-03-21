import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ModalType {
  EditModal,
}

export interface ModalEditData {
  entryID: string;
}

export interface ModalState {
  opened: boolean;
  modalID?: ModalType;
  data?: ModalEditData;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modalState$ = new BehaviorSubject<ModalState>({
    opened: false,
  });

  get modalState$() {
    return this._modalState$.asObservable();
  }

  closeModal() {
    this._modalState$.next({
      ...this._modalState$.value,
      opened: false,
    });
  }

  openModal(opts: { modalID: ModalType; data: ModalEditData }) {
    console.log(this);
    this._modalState$.next({
      opened: true,
      modalID: opts.modalID,
      data: opts.data,
    });
  }
}
