import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Candidate } from './candidate/candidate';

import { CandidateRoutingModule } from './candidate-routing-module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Candidate
  ]
})
export class CandidateModule { }
