import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilecarouselComponent } from './mobilecarousel.component';

describe('MobilecarouselComponent', () => {
  let component: MobilecarouselComponent;
  let fixture: ComponentFixture<MobilecarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilecarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilecarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
