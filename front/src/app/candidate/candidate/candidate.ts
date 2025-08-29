import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { CandidateService, ICandidate } from '../../services/candidate-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';

import { PopupUpdated } from './components/popup-updated/popup-updated.js';
import { ComponentType } from '@angular/cdk/overlay';


@Component({
  selector: 'app-candidate',
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './candidate.html',
  styleUrl: './candidate.scss'
})
export class Candidate {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  uploading = false;

  candidateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
  });

  candidate: ICandidate = { name: '', surname: '', excel: undefined };

  selectedFile?: File = undefined;

  constructor(
    private candidateService: CandidateService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private ngZone: NgZone,
  ) {

  }

  validFile(file: File): boolean {
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const allowedExtensions = ['.xltx', '.xlsx'];
    if (!allowedExtensions.includes(ext)) {
      alert('Solo se permiten archivos Excel (.xlsx)');
      this.selectedFile = undefined;
      return false;
    }
    return true;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length && this.validFile(input.files[0])) {
      this.selectedFile = input.files[0];
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
    if (event.dataTransfer?.files.length && this.validFile(event.dataTransfer.files[0])) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }


  send() {
    this.ngZone.run(() => {
    this.candidate.name = this.candidateForm.value.name || '';
    this.candidate.surname = this.candidateForm.value.surname || '';
    if (this.selectedFile && !this.validFile(this.selectedFile))
      return;
    this.candidate.excel = this.selectedFile;
    this.uploading = true;

    this.candidateService.createCandidate(this.candidate).subscribe({
      next: response => {
        this.candidateForm.get('name')?.setValue('');
        this.candidateForm.get('surname')?.setValue('');
        this.selectedFile = undefined;
        this.openDialog(PopupUpdated, response);
        this.uploading = false;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error creating candidate:', error);
        this.uploading = false;
      }
    });
  });
  }

  openDialog(component: ComponentType<any>, data: any) {
    this.dialog.open(component, {
      width: '40em',
      data: data
    });
  }

}
