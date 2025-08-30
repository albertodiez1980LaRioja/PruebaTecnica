import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ITableMaterialColumn } from './table-material-interfaces';

@Component({
  selector: 'app-table-material',
  imports: [MatTableModule, CommonModule],
  templateUrl: './table-material.html',
  styleUrl: './table-material.scss'
})
export class TableMaterial {
  @Input() data: any[] = [];
  @Input() displayedColumns: ITableMaterialColumn[] = [];
  names: string[] = [];


  ngOnChanges() {
    if (this.displayedColumns && this.displayedColumns.length > 0) {
      this.names = this.displayedColumns.map(c => c.name);
    }
  }
}
