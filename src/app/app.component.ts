import { Component } from '@angular/core';
import { RedezeitType } from './models/redezeit-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  STATE_ENUM = RedezeitType;
}
