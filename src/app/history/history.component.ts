import { Component } from '@angular/core';
import { map } from 'rxjs';
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

  rezeiten = this.redezeitState.redezeiten.pipe(
    map((redezeite) => {
      [...redezeite].reverse();
    })
  );

  public edit(entryID: string) {
    this.modalService.openModal({
      modalID: ModalType.EditModal,
      data: { entryID: entryID },
    });
  }

  public delete(entryID: string) {
    this.modalService
      .openModal({
        modalID: ModalType.DeleteModal,
      })
      .then((confirmed) => this.redezeitState.removeRedezeit(entryID));
  }
}
