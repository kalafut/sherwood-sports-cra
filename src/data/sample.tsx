import * as consts from "../consts";
import { OrgList } from "../types";

export const orgs: OrgList = [
  {
    name: "Sample Org",
    sport: consts.SAMPLE,
    programs: [
      {
        name: "Sample 1",
        season: [consts.NOV, consts.MAR],
        //registration: consts.OCT,
        ageMin: 7,
        ageMax: 10,
      },
      {
        name: "No age limit",
        season: [consts.JAN, consts.MAR],
        // registration: consts.OCT,
        allAges: true,
      },
    ],
  },
];
