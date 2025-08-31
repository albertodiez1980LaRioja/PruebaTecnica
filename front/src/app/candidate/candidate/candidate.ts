import { Component, ElementRef, ViewChild } from '@angular/core';
import { CandidateService } from '../../shared/services/candidate-service';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

import { PopupUpdated } from './components/popup-updated/popup-updated.js';
import { PopupError } from '../../shared/components/popup-error/popup-error';
import { FileDropComponent } from '../../shared/components/file-drop-component/file-drop-component';
import { TableMaterial } from '../../shared/components/table-material/table-material';
import { Subject, takeUntil } from 'rxjs';
import { ICandidate, ICandidateSaved } from '../../shared/interfaces/candidate-interface';
import { ITableMaterialColumn } from '../../shared/components/table-material/table-material-interfaces';



@Component({
  selector: 'app-candidate',
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinner, FileDropComponent, TableMaterial],
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
  candidateColumns: ITableMaterialColumn[] = [
    { name: 'name', label: 'First Name', type: 'string' },
    { name: 'surName', label: 'Last Name', type: 'string' },
    { name: 'seniority', label: 'Seniority', type: 'string' },
    { name: 'yearsExperience', label: 'Years of Experience', type: 'number' },
    { name: 'availability', label: 'Availability', type: 'boolean' }
  ];

  selectedFile?: File = undefined;

  @ViewChild(FileDropComponent) fileDrop!: FileDropComponent;

  candidates: ICandidateSaved[] = [];

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
    this.candidateForm.disable();
    this.candidateService.createCandidate(this.candidate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.clearForm();
          this.candidates = this.candidates.filter(c => c.name !== response.name || c.surName !== response.surName);
          this.candidates.unshift(response);
          this.candidates = [...this.candidates];
          this.openDialog(PopupUpdated, response);
          this.candidateForm.enable();
          this.uploading = false;
        },
        error: error => {
          this.uploading = false;
          this.openDialog(PopupError, error);
          this.candidateForm.enable();
          console.error('Error creating candidate:', error);
        }
      });
  }

  clearForm() {
    this.candidateForm.get('name')?.setValue('');
    this.candidateForm.get('surname')?.setValue('');
    this.selectedFile = undefined;
    if (this.fileDrop) 
      this.fileDrop.reset();
  }

  openDialog(component: ComponentType<any>, data: ICandidateSaved) {
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
