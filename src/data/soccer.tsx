import * as consts from "../consts";
import { OrgList } from "../types";

const orgList: OrgList = {
  orgs: [
    {
      name: "Sherwood Youth Soccer",
      url: "https://www.sherwoodsoccer.org/",
      sport: consts.SOCCER,
      programs: [
        {
          name: "Fall Soccer",
          season: [consts.APR, consts.JUN],
          registration: consts.JAN,
        },
        {
          name: "Westside Timbers",
        },
      ],
    },
    {
      name: "Westside Timbers",
      url: "http://www.westsidetimbers.org/",
      sport: consts.SOCCER,
      programs: [
        {
          name: "Timber Tots",
          season: [consts.APR, consts.JUN],
          registration: consts.JAN,
          url: "http://www.westsidetimbers.org/about-us/program-overview/timber-tots-program",
          ageMax: 6,
        },
        {
          name: "Development Program",
          url: "http://www.westsidetimbers.org/about-us/program-overview/development-program-wdp",
          ageMin: 7,
          ageMax: 10,
        },
        {
          name: "Development Program 2",
          url: "http://www.westsidetimbers.org/about-us/program-overview/development-program-wdp",
          gradeMin: 3,
          gradeMax: 5,
        },
        {
          name: "At least 10",
          url: "http://www.westsidetimbers.org/about-us/program-overview/development-program-wdp",
          ageMin: 10,
        },
      ],
    },
  ],
};

export default orgList;
