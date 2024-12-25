import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StacksEditComponent } from './stacks-edit.component';

describe('StacksEditComponent', () => {
  let component: StacksEditComponent;
  let fixture: ComponentFixture<StacksEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacksEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StacksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
