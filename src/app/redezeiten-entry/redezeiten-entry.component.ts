import { Component, Input } from '@angular/core';
import { Redezeit } from '../models/redezeit';

@Component({
  selector: 'app-redezeiten-entry',
  templateUrl: './redezeiten-entry.component.html',
  styleUrls: ['./redezeiten-entry.component.scss'],
})
export class RedezeitenEntryComponent {
  @Input() redezeit: Redezeit | undefined;
}
