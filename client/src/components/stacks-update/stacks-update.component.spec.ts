import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StacksUpdateComponent } from './stacks-update.component';

describe('StacksEditComponent', () => {
  let component: StacksUpdateComponent;
  let fixture: ComponentFixture<StacksUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacksUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StacksUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
