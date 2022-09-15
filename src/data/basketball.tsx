import slug from "slug";
import * as consts from "../consts";
import { OrgList } from "../types";

const orgList: OrgList = {
  orgs: [
    {
      name: "Sherwood Youth Basketball",
      summary: "Hoops!",
      sport: consts.BASKETBALL,
      programs: [
        {
          name: "Rec Basketball",
          registration: consts.SEP,
          season: [consts.NOV, consts.FEB],
          gradeMin: 3,
          gradeMax: 12,
        },
        {
          name: "Competitive Basketball",
        },
      ],
    },
  ],
};

export default orgList;
