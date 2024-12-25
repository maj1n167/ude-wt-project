import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsEditComponent } from './cards-edit.component';

describe('CardsEditComponent', () => {
  let component: CardsEditComponent;
  let fixture: ComponentFixture<CardsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
