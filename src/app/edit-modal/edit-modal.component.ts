import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, firstValueFrom, map } from 'rxjs';
import { RedezeitSpeaker } from '../models/redezeit-type';
import { RedezeitType } from '../_enums/redezeit-type.enum';
import { GlobalStateService } from '../_services/global-state.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private globalStateService: GlobalStateService
  ) {}

  Speaker = RedezeitSpeaker;

  get currentSelectedRedezeitType() {
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
        redezeiten.find((redezeit) => redezeit.id === entryID)
      )
    );
  }

  public ngOnInit(): void {
    firstValueFrom(this.entry$).then((entry) =>
      this.form.setValue({
        duration: entry?.duration ?? 0,
        speaker: entry?.speaker ?? RedezeitSpeaker.CISM,
        type: entry?.type ?? RedezeitType.Beitrag,
      })
    );
  }

  public changeSpeaker(speaker: RedezeitSpeaker) {
    this.form.patchValue({ speaker });
  }
}
