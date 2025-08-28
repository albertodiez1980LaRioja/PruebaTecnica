import { Component, ElementRef, ViewChild } from '@angular/core';
import { CandidateService, ICandidate } from '../../services/candidate-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './candidate.html',
  styleUrl: './candidate.scss'
})
export class Candidate {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  

  candidateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
  });

  candidate: ICandidate = { name: '', surname: '', excel: undefined };

  selectedFile?: File = undefined;

  constructor(
    private candidateService: CandidateService
  ) {

  }

  validFile(file: File): boolean {
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const allowedExtensions = ['.xltx' ,'.xlsx'];
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


  onSubmit() {
    this.candidate.name = this.candidateForm.value.name || '';
    this.candidate.surname = this.candidateForm.value.surname || '';
    if (this.selectedFile && !this.validFile(this.selectedFile))
      return;
    this.candidate.excel = this.selectedFile;


    this.candidateService.createCandidate(this.candidate).subscribe({
      next: response => {
        console.log('Candidate created:', response);
      },
      error: error => {
        console.error('Error creating candidate:', error);
      }
    });
  }

}
