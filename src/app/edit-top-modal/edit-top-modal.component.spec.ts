import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTopModalComponent } from './edit-top-modal.component';

describe('EditTopModalComponent', () => {
  let component: EditTopModalComponent;
  let fixture: ComponentFixture<EditTopModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTopModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
