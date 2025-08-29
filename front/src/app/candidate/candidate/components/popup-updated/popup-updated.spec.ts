import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdated } from './popup-updated';

describe('PopupUpdated', () => {
  let component: PopupUpdated;
  let fixture: ComponentFixture<PopupUpdated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupUpdated]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUpdated);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
