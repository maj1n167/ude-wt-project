import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSessionComponent } from './training-session.component';

describe('TrainingSessionComponent', () => {
  let component: TrainingSessionComponent;
  let fixture: ComponentFixture<TrainingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
