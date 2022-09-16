import _ from "lodash";
import { orgs as lacrosse } from "./lacrosse";
import { orgs as basketball } from "./basketball";
import { orgs as soccer } from "./soccer";
import { orgs as sample } from "./sample";
import * as consts from "../consts";
import { Org, Program, ProgramFilterer } from "../types";

// sport can be overridden per program
const data: { orgs: Org[] } = {
  orgs: [...basketball, ...lacrosse, ...soccer, ...sample],
};

// TODO: combine
function gradeToAge(grade: number, max: boolean) {
  const offset = max ? 6 : 5;
  if (grade) {
    return grade + offset;
  }
}

export function orgs() {
  return data.orgs;
}

export function filteredOrgs(filters: ProgramFilterer[]): Org[] {
  const newOrgs = data.orgs.map((org) => {
    let newOrg = { ...org };
    newOrg.programs = org.programs.filter((program) => {
      return filters.every((f) => f.filter(program, newOrg));
    });

    return newOrg;
  });

  return newOrgs.filter((org: Org) => org.programs.length > 0);
}

export const allProgramsFlat: Program[] = _.flatMap(data.orgs, (org) => {
  return org.programs.map((prog: Program) => {
    if (prog.sport === undefined) {
      prog.sport = org.sport;
    }
    prog.effectiveAgeMin =
      prog.ageMin ||
      (prog.gradeMin && gradeToAge(prog.gradeMin, false)) ||
      consts.MIN_FILTER_AGE;
    prog.effectiveAgeMax =
      prog.ageMax ||
      (prog.gradeMax && gradeToAge(prog.gradeMax, true)) ||
      consts.MAX_FILTER_AGE;

    return { ...prog, org: org };
  });
});

export const sports: string[] = _.uniq(
  data.orgs.map((v: Org): string => v.sport)
).sort();

export const programsBySport = _.groupBy(allProgramsFlat, "sport");