import * as consts from "../consts";
import { OrgList } from "../types";

export const orgs: OrgList = [
  {
    name: "Musa Martial Arts",
    summary: "We play Lacrosse",
    url: "https://musasherwood.com/",
    sport: consts.MARTIAL_ARTS,
    programs: [
      {
        name: "Little Warriors",
        url: "https://musasherwood.com/kids-martial-arts",
        season: consts.ALL_YEAR,
        ageMin: 3,
        ageMax: 5
      },
      {
        name: "Youth Taekwondo",
        url: "https://musasherwood.com/kids-martial-arts",
        season: consts.ALL_YEAR,
        ageMin: 6,
      },
      {
        name: "Adult Taekwondo, Hapkido, Jiu-Jitsu",
        url:"https://musasherwood.com/adult-martial-arts",
        season: consts.ALL_YEAR,
        gradeMax: 5,
      },
    ],
  },
];

