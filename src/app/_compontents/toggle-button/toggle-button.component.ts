import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true,
    },
  ],
})
export class ToggleButtonComponent implements ControlValueAccessor, OnChanges {
  @Input() toggled = false;
  @Input()
  type: any = null;

  private _onChange = (arg1: any) => {};
  private _onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['toggled']) {
      console.log('flip!', changes);
      this.cdr.detectChanges();
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onChange = fn;
  }

  onClick() {
    console.log('CHANGE TO', this.type);
    if (this._onChange) {
      this._onChange(this.type);
    }
  }

  writeValue(obj: any): void {
    this.toggled = obj === this.type;
    console.log(obj);
    this.cdr.detectChanges();
  }

  setDisabledState?(isDisabled: boolean): void {}
}
