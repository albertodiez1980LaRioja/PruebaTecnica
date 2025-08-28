
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ICandidate {
  name: string;
  surname: string;
  excel: Blob | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = 'http://localhost:3000/api/candidates';

  constructor(private http: HttpClient) {}

  createCandidate(candidate: ICandidate): Observable<any> {
    let formData = new FormData();
    formData.append('name', candidate.name);
    formData.append('surname', candidate.surname);
    if (candidate.excel) {
      formData.append('excel', candidate.excel);
    }
    return this.http.post(this.baseUrl, formData);
  }
}
