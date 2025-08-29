import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupError } from './popup-error';

describe('PopupError', () => {
  let component: PopupError;
  let fixture: ComponentFixture<PopupError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
