import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IErrorHTTP } from '../../interfaces/error.interface';


@Component({
  selector: 'app-popup-error',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './popup-error.html',
  styleUrls: ['./popup-error.scss']
})
export class PopupError {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IErrorHTTP) {
    console.log(data);
    
  }
}
