import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMaterial } from './table-material';

describe('TableMaterial', () => {
  let component: TableMaterial;
  let fixture: ComponentFixture<TableMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
