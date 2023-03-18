import { Component } from '@angular/core';
import { GlobalStateService } from '../_services/global-state.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  constructor(public redezeitState: GlobalStateService) {}
}
