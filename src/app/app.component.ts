import { Component } from '@angular/core';
import { RedezeitSpeaker } from './models/redezeit-type';
import { RedezeitType } from './_enums/redezeit-type.enum';
import { GlobalStateService } from './_services/global-state.service';
import { ModalService } from './_services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  STATE_ENUM = RedezeitSpeaker;

  constructor(
    public redezeitState: GlobalStateService,
    private modalService: ModalService
  ) {}

  stop() {
    this.redezeitState.state$.next(RedezeitSpeaker.PAUSE);
  }
}
