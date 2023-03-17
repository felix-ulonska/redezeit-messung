import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedezeitSideComponent } from './redezeit-side.component';

describe('RedezeitSideComponent', () => {
  let component: RedezeitSideComponent;
  let fixture: ComponentFixture<RedezeitSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedezeitSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedezeitSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
