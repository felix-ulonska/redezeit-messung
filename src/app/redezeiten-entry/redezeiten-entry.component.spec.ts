import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedezeitenEntryComponent } from './redezeiten-entry.component';

describe('RedezeitenEntryComponent', () => {
  let component: RedezeitenEntryComponent;
  let fixture: ComponentFixture<RedezeitenEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedezeitenEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedezeitenEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
