import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedezeitTableComponent } from './redezeit-table.component';

describe('RedezeitTableComponent', () => {
  let component: RedezeitTableComponent;
  let fixture: ComponentFixture<RedezeitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedezeitTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedezeitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
