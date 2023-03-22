import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, fromEvent, map } from 'rxjs';
import { RedezeitSpeaker } from './models/redezeit-type';
import { RedezeitType } from './_enums/redezeit-type.enum';
import { GlobalStateService } from './_services/global-state.service';
import { ModalService, ModalType } from './_services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  STATE_ENUM = RedezeitSpeaker;
  REDEZEIT_TYPE = RedezeitType;

  constructor(
    public redezeitState: GlobalStateService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    console.log('====================================');
    console.log(
      'Ayoooooo\nIntresse an der Anwendung?\nSchaue einfach in das Github!\nhttps://github.com/felix-ulonska/redezeit-messung'
    );
    console.log('====================================');
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(filter((keyPressed: KeyboardEvent) => keyPressed.key === 'b'))
      .subscribe(() => {
        this.toggleBerichtType();
      });
  }

  get modifier$() {
    return this.redezeitState.modifier$;
  }

  get isModifierBericht$() {
    return this.modifier$.pipe(
      map((modifier) => modifier.type === RedezeitType.Bericht)
    );
  }

  toggleBerichtType() {
    console.log('this modifier');
    this.redezeitState.modifier$.next({
      type:
        this.redezeitState.modifier$.value.type !== RedezeitType.Bericht
          ? RedezeitType.Bericht
          : RedezeitType.Beitrag,
    });
  }

  stop() {
    this.redezeitState.state$.next(RedezeitSpeaker.PAUSE);
  }

  export() {
    this.redezeitState.exportCSV();
  }

  delete() {
    this.modalService
      .openModal({ modalID: ModalType.DeleteModal })
      .then((confirm) => {
        if (confirm) {
          this.redezeitState.redezeiten.next([]);
        }
      });
  }
}
