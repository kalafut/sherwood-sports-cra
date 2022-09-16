import _ from "lodash";
import { orgs as lacrosse } from "./lacrosse";
import { orgs as basketball } from "./basketball";
import { orgs as soccer } from "./soccer";
import { orgs as sample } from "./sample";
import * as consts from "../consts";
// import slugify from "slug";
import { AgeFilter, Org, OrgList, Program, SportsFilter } from "../types";

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

/*
function slugifyOrgs() {
  const allSlugs = new Set();
  data.orgs.forEach((v) => {
    const s = slugify(v.name);
    if (allSlugs.has(s)) {
      throw new Error(`Duplicate slug name: ${s}`);
    }
    allSlugs.add(s);
    v.id = s;
  });
}

slugifyOrgs();
*/

export function orgById(id: string) {
  return _.find(data.orgs, ["id", id]);
}

export function orgs() {
  return data.orgs;
}

export const allProgramsFlat: Program[] = _.flatMap(data.orgs, (org) => {
  return org.programs.map((prog: Program) => {
    if (prog.sport === undefined) {
      prog.sport = org.sport;
    }
    if (
      (prog.ageMin || prog.ageMax || prog.gradeMin || prog.gradeMax) &&
      prog.allAges
    ) {
      throw new Error(
        `Data Error: Program "${prog.name}" is specifying both age limits and allAges == true`
      );
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

const m = allProgramsFlat.map((v: Program) => v.sport);

export const sports: string[] = _.uniq(
  data.orgs.map((v: Org): string => v.sport)
).sort();

export const programsBySport = _.groupBy(allProgramsFlat, "sport");

// export function programsBySport2(
//   sportsFilter: SportsFilter,
//   ageFilter: AgeFilter
// ) {
//   const filtered = allProgramsFlat.filter(
//     (v: Program) =>
//       (sportsFilter.size === 0 || sportsFilter.has(v.sport)) &&
//       v.effectiveAgeMax! >= ageFilter.min &&
//       v.effectiveAgeMin! <= ageFilter.max
//   );

//   return _.groupBy(filtered, "sport");
// }

// export function slug(program: Program): string {
//   return slugify(program.name);
// }
