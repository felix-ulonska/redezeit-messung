import { Component, Input, Output } from '@angular/core';
import { map, Subject } from 'rxjs';
import { ModalService, ModalType } from '../_services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Output()
  public confirmed = new Subject<void>();

  @Input()
  public titleText: string = '';

  @Input()
  public confirmButton?: string;

  @Input()
  public modalID?: ModalType;

  constructor(private modalService: ModalService) {}

  get opened$() {
    return this.modalService.modalState$.pipe(
      map((state) => state.opened && state.modalID === this.modalID)
    );
  }

  public close() {
    return this.modalService.closeModal();
  }

  public confirm() {
    this.confirmed.next();
  }
}
