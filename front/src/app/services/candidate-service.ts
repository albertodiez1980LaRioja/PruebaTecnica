
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICandidate, ICandidateSaved } from '../shared/interfaces/candidate-interface';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = 'http://localhost:3000/api/candidates';

  constructor(private http: HttpClient) {}

  createCandidate(candidate: ICandidate): Observable<ICandidateSaved> {
    let formData = new FormData();
    formData.append('name', candidate.name);
    formData.append('surname', candidate.surname);
    if (candidate.excel) {
      formData.append('excel', candidate.excel);
    }
    return this.http.post<ICandidateSaved>(this.baseUrl, formData);
  }
}
