import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, firstValueFrom, map, Subject } from 'rxjs';
import { RedezeitSpeaker } from '../models/redezeit-type';
import { RedezeitType } from '../_enums/redezeit-type.enum';
import { GlobalStateService } from '../_services/global-state.service';
import { ModalService, ModalType } from '../_services/modal.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit, OnDestroy {
  ModalTypeEdit = ModalType.EditModal;

  constructor(
    private modalService: ModalService,
    private globalStateService: GlobalStateService,
  ) {}

  onDestroy$ = new Subject<void>();
  Speaker = RedezeitSpeaker;
  Type = RedezeitType;

  get currentType() {
    return this.form.controls['type'].value;
  }

  get currentSpeaker() {
    return this.form.controls['speaker'].value;
  }

  form = new FormGroup({
    duration: new FormControl(0), // Validate Number
    speaker: new FormControl<RedezeitSpeaker>(RedezeitSpeaker.CISM),
    type: new FormControl<RedezeitType>(RedezeitType.Bericht),
  });

  get entry$() {
    return combineLatest([
      this.modalService.modalState$.pipe(map((state) => state.data?.entryID)),
      this.globalStateService.redezeiten,
    ]).pipe(
      map(([entryID, redezeiten]) =>
        redezeiten.redezeiten.find((redezeit) => redezeit.id === entryID),
      ),
    );
  }

  public ngOnInit(): void {
    this.entry$.subscribe((entry) =>
      this.form.setValue({
        duration: entry?.duration ?? 0,
        speaker: entry?.speaker ?? RedezeitSpeaker.CISM,
        type: entry?.type ?? RedezeitType.Beitrag,
      }),
    );
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public changeSpeaker(speaker: RedezeitSpeaker) {
    this.form.patchValue({ speaker });
  }

  public changeType(type: RedezeitType) {
    this.form.patchValue({ type });
  }

  public save() {
    firstValueFrom(
      combineLatest([this.globalStateService.redezeiten, this.entry$]),
    )
      .then(([state, entryID]) => {
        this.globalStateService.redezeiten.next({
          ...state,
          redezeiten: state.redezeiten.map((redezeit) => {
            if (redezeit.id === entryID!.id) {
              return {
                ...redezeit,
                duration: this.form.value.duration ?? 0,
                speaker: this.form.value.speaker ?? RedezeitSpeaker.CISM,
                type: this.form.value.type ?? RedezeitType.Beitrag,
              };
            }
            return redezeit;
          }),
        });
      })
      .then(() => {
        this.modalService.closeModal();
      });
  }
}
