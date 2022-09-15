export interface Program {
  name: string;
  registration?: number;
  season?: number[];
  sport?: string;
  gradeMin?: number;
  gradeMax?: number;
  ageMin?: number;
  ageMax?: number;
  allAges?: boolean;
  effectiveAgeMin?: number;
  effectiveAgeMax?: number;
  url?: string;
}

export interface Org {
  name: string;
  summary?: string;
  sport: string;
  programs: Program[];
  id?: string;
  url?: string;
}

export interface OrgList {
  orgs: Org[];
}

export interface AgeFilter {
  min: number;
  max: number;
}
