import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Candidate } from './candidate/candidate';

import { CandidateRoutingModule } from './candidate-routing-module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    Candidate
  ]
})
export class CandidateModule { }
