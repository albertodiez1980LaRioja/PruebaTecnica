import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-component',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './error-component.html',
  styleUrl: './error-component.scss'
})
export class ErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    console.log(data);
    
  }

}
