import { Routes } from '@angular/router';

export const routes: Routes = [
     { path: '', loadChildren: () => import('./candidate/candidate-module').then(m => m.CandidateModule) }
];
