import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPool } from './hotel-pool.component';

describe('HotelPool', () => {
  let component: HotelPool;
  let fixture: ComponentFixture<HotelPool>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelPool]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelPool);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
