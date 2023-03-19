import { Component, Input, Output } from '@angular/core';
import { map, Subject } from 'rxjs';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Output()
  public saved = new Subject<void>();

  @Input()
  public titleText: string = '';

  constructor(private modalService: ModalService) {}

  get opened$() {
    return this.modalService.modalState$.pipe(map((state) => state.opened));
  }

  public close() {
    return this.modalService.closeModal();
  }

  public save() {
    this.saved.next();
  }
}
