import { Component, Input } from '@angular/core';
import { Redezeit } from '../models/redezeit';

@Component({
  selector: 'app-redezeit-table',
  templateUrl: './redezeit-table.component.html',
  styleUrls: ['./redezeit-table.component.scss'],
})
export class RedezeitTableComponent {
  @Input() redezeit: Redezeit | undefined;
}
