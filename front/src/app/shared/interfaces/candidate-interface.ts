export interface ICandidate {
  name: string;
  surname: string;
  excel: Blob | undefined;
}

export interface ICandidateSaved {
  name: string;
  surName: string;
  seniority: string;
  yearsExperience: number;
  availability: boolean;
}