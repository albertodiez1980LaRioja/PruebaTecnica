import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Candidate } from './candidate/candidate';

const routes: Routes = [
  { path: '', component: Candidate }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
