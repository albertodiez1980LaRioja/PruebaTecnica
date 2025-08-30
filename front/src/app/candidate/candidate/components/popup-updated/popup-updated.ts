import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ICandidateSaved } from '../../../../shared/interfaces/candidate-interface';

@Component({
  selector: 'app-popup-updated',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './popup-updated.html',
  styleUrls: ['./popup-updated.scss'] 
})
export class PopupUpdated {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ICandidateSaved) {

  }
}