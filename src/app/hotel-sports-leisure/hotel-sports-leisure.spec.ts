import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSportsLeisure } from './hotel-sports-leisure.component';

describe('HotelSportsLeisure', () => {
  let component: HotelSportsLeisure;
  let fixture: ComponentFixture<HotelSportsLeisure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelSportsLeisure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelSportsLeisure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
