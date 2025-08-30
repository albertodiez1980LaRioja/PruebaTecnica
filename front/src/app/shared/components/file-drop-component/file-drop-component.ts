import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

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
        alert(`Solo se permiten archivos: ${this.allowedExtensions.join(', ')}`);
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
        alert(`Solo se permiten archivos: ${this.allowedExtensions.join(', ')}`);
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
}
