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

export type OrgList = Org[];

export interface Org {
  name: string;
  summary?: string;
  sport: string;
  programs: Program[];
  id?: string;
  url?: string;
}

export interface OrgData {
  name: string;
  summary?: string;
  sport: string;
  programs: Program[];
  id?: string;
  url?: string;
}

export interface OrgClass extends OrgData {
  slug(): string;
}

export interface AgeFilter {
  min: number;
  max: number;
}

// export class OrgClass {
//   name: string;
//   summary?: string;
//   sport: string;
//   programs: Program[];
//   id?: string;
//   url?: string;

//   constructor(org: OrgData) {}
// }

// export class Program {
//   size: number;
//   name: string;

//   constructor(n: string, s: number) {
//     this.size = s;
//     this.name = n;
//   }
// }

// let v = new ABC("adsf", 4);
