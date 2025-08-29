import { Component, ElementRef, ViewChild } from '@angular/core';
import { CandidateService, ICandidate } from '../../services/candidate-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

import { PopupUpdated } from './components/popup-updated/popup-updated.js';
import { PopupError } from '../../shared/components/popup-error/popup-error';
import { FileDropComponent } from '../../shared/components/file-drop-component/file-drop-component';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-candidate',
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinner, FileDropComponent],
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

  private dialogRef?: MatDialogRef<any>;
  private destroy$ = new Subject<void>();

  constructor(
    private candidateService: CandidateService,
    private dialog: MatDialog,
  ) {
    this.uploading = false;
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  send() {
    this.candidate.name = this.candidateForm.value.name || '';
    this.candidate.surname = this.candidateForm.value.surname || '';
    this.candidate.excel = this.selectedFile;
    this.uploading = true;
    this.candidateService.createCandidate(this.candidate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.clearForm();
          this.openDialog(PopupUpdated, response);
          this.uploading = false;
        },
        error: error => {
          this.uploading = false;
          this.clearForm();
          this.openDialog(PopupError, error);
          console.error('Error creating candidate:', error);
        }
      });
  }

  clearForm() {
    this.candidateForm.get('name')?.setValue('');
    this.candidateForm.get('surname')?.setValue('');
    this.selectedFile = undefined;
  }

  openDialog(component: ComponentType<any>, data: any) {
    this.dialogRef = this.dialog.open(component, {
      width: '40em',
      data: data
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.dialogRef?.close();
  }

}
