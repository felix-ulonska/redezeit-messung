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
    private modalService: ModalService,
  ) {}

  public edit(entryID: string) {
    this.modalService.openModal({
      modalID: ModalType.EditModal,
      data: { entryID: entryID },
    });
  }

  public combinedRedezeitAndTop$ = this.redezeitState.redezeiten.pipe(
    map((state) => {
      return [...state.redezeiten, ...state.tops].sort(
        (a, b) => a.date.valueOf() - b.date.valueOf(),
      );
    }),
  );

  public delete(entryID: string) {
    this.modalService
      .openModal({
        modalID: ModalType.DeleteModal,
      })
      .then((confirmed) => {
        if (confirmed) this.redezeitState.removeRedezeit(entryID);
      });
  }

  public deleteTop(entryID: string) {
    this.modalService
      .openModal({
        modalID: ModalType.DeleteModal,
      })
      .then((confirmed) => {
        if (confirmed) this.redezeitState.removeTop(entryID);
      });
  }

  public editTop(entryID: string) {
    this.modalService.openModal({
      modalID: ModalType.EditTopModal,
      data: { entryID: entryID },
    });
  }
}
