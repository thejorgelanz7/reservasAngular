import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBarberComponent } from './single-barber.component';

describe('SingleBarberComponent', () => {
  let component: SingleBarberComponent;
  let fixture: ComponentFixture<SingleBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleBarberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
