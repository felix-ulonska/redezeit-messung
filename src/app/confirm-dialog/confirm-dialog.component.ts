import { Component } from '@angular/core';
import { ModalService, ModalType } from '../_services/modal.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  ModalTypeConfirm = ModalType.DeleteModal;

  constructor(private modalService: ModalService) {}

  confirm() {
    this.modalService.closeModal({ confirmed: true });
  }
}
