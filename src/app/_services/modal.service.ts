import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';

export enum ModalType {
  EditModal,
  DeleteModal,
}

export interface ModalEditData {
  entryID: string;
}

export interface ModalDeleteData {
  confirmTrigger: () => {};
}

export interface ModalState {
  opened: boolean;
  modalID?: ModalType;
  data?: ModalEditData;
}

export interface ModalResult {
  confirmed?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modalState$ = new BehaviorSubject<ModalState>({
    opened: false,
  });

  private _modalResult$ = new Subject<ModalResult>();

  get modalState$() {
    return this._modalState$.asObservable();
  }

  closeModal(result: Partial<ModalResult> = {}) {
    this._modalState$.next({
      ...this._modalState$.value,
      opened: false,
    });

    this._modalResult$.next({});
  }

  openModal(opts: {
    modalID: ModalType;
    data?: ModalEditData;
  }): Promise<ModalResult> {
    this._modalState$.next({
      opened: true,
      modalID: opts.modalID,
      data: opts.data,
    });

    return firstValueFrom(this._modalResult$);
  }
}
