import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ErrorComponent } from './error-component/error-component';

@Component({
  selector: 'app-file-drop-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-drop-component.html',
  styleUrl: './file-drop-component.scss'
})
export class FileDropComponent {
  @Input() allowedExtensions: string[] = ['.xls', '.xlsx'];
  @Input() disabled = false;   
  @Output() fileSelected = new EventEmitter<File>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile?: File;

  private dialogRef?: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
  ) {

  }

  onFileSelected(event: Event) {
    if (this.disabled) 
      return;
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (this.isValidFile(file)) {
        this.selectedFile = file;
        this.fileSelected.emit(file);
      } else {
        this.openDialog(ErrorComponent, `Only files with the extensions: ${this.allowedExtensions.join(', ')}`);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    (event.currentTarget as HTMLElement).classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).classList.remove('dragover');
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      if (this.isValidFile(file)) {
        this.selectedFile = file;
        this.fileSelected.emit(file);
      } else {
        this.openDialog(ErrorComponent, `Only files with the extensions: ${this.allowedExtensions.join(', ')}`);
      }
    }
  }

  triggerInputClick(input: HTMLInputElement | undefined) {
    input?.click();
  }

  private isValidFile(file: File): boolean {
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    return this.allowedExtensions.includes(ext);
  }

  reset() {
    this.selectedFile = undefined;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // limpia el input file real
    }
  }

  openDialog(component: ComponentType<any>, data: string) {
    this.dialogRef = this.dialog.open(component, {
      width: '40em',
      data: data
    });
  }

  ngOnDestroy() {
    this.dialogRef?.close();
  }
}
