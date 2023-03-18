import { Component } from '@angular/core';
import { RedezeitType } from './models/redezeit-type';
import { GlobalStateService } from './_services/global-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  STATE_ENUM = RedezeitType;

  constructor(public redezeitState: GlobalStateService) {}
}
