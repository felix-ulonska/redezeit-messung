import { Component } from '@angular/core';
import { GlobalStateService } from '../_services/global-state.service';
import { ModalService, ModalType } from '../_services/modal.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  constructor(
    public redezeitState: GlobalStateService,
    private modalService: ModalService
  ) {}

  public edit(entryID: string) {
    this.modalService.openModal({
      modalID: ModalType.EditModal,
      data: { entryID: entryID },
    });
  }
}
