import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRestaurant } from './hotel-restaurant.component';

describe('HotelRestaurant', () => {
  let component: HotelRestaurant;
  let fixture: ComponentFixture<HotelRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelRestaurant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelRestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
