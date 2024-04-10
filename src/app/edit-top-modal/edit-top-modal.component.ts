import { Component } from '@angular/core';
import { ModalService, ModalType } from '../_services/modal.service';
import { GlobalStateService } from '../_services/global-state.service';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, firstValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-edit-top-modal',
  templateUrl: './edit-top-modal.component.html',
  styleUrl: './edit-top-modal.component.scss',
})
export class EditTopModalComponent {
  ModalTypeEdit = ModalType.EditTopModal;

  constructor(
    private modalService: ModalService,
    private globalStateService: GlobalStateService,
  ) {}

  form = new FormGroup({
    name: new FormControl(''), // Validate Number
  });

  get entry$() {
    return combineLatest([
      this.modalService.modalState$.pipe(map((state) => state.data?.entryID)),
      this.globalStateService.redezeiten,
    ]).pipe(
      map(([entryID, redezeiten]) =>
        redezeiten.tops.find((top) => top.id === entryID),
      ),
    );
  }

  public ngOnInit(): void {
    this.entry$.subscribe((entry) =>
      this.form.setValue({
        name: entry?.name ?? '',
      }),
    );
  }

  public save() {
    firstValueFrom(
      combineLatest([this.globalStateService.redezeiten, this.entry$]),
    )
      .then(([state, entryID]) => {
        this.globalStateService.redezeiten.next({
          ...state,
          tops: state.tops.map((top) => {
            if (top.id === entryID!.id) {
              return {
                ...top,
                name: this.form.value.name ?? '',
              };
            }
            return top;
          }),
        });
      })
      .then(() => {
        this.modalService.closeModal();
      });
  }
}
