import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBarbersCardComponent } from './all-barbers-card.component';

describe('AllBarbersCardComponent', () => {
  let component: AllBarbersCardComponent;
  let fixture: ComponentFixture<AllBarbersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBarbersCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBarbersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
